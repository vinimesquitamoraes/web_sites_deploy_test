import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'vue-docgen-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const componentsDir = path.join(projectRoot, 'src/components'); 
const baseDocsDir = path.join(projectRoot, 'docs/components');     

/**
 * Helper to sanitize strings so they don't break markdown table rows/columns
 */
function sanitizeTableCell(text) {
	if (text === undefined || text === null) return '-';
	const stringVal = String(text).trim();
	if (stringVal === '') return '-';
	// Replace pipes with code-friendly entity or escape them, and strip newlines
	return stringVal.replace(/\|/g, '\\|').replace(/[\r\n]+/g, ' ');
}

/**
 * Builder Pattern class to assemble the component documentation markdown.
 */
class MarkdownBuilder {
	constructor() {
		this.sections = [];
	}

	setFrontmatter(componentName, timestamp) {
		this.sections.push(`---
type: 'Page'
title: ${componentName}
aliases: null
description: null
icon: null
createdAt: '${timestamp}'
lastUpdated: '${timestamp}'
tags: []
imagemDeCapa: null
---`);
		return this;
	}

	addOverview(brief) {
		this.sections.push(`## Overview\n\n${sanitizeTableCell(brief)}`);
		return this;
	}

	addImportedComponents(components) {
		const content = components.length > 0 
			? components.map(imp => `- ${sanitizeTableCell(imp.name)} (\`${sanitizeTableCell(imp.path)}\`)`).join('\n')
			: '- *None specified*';
		this.sections.push(`## Imported Components\n\n${content}`);
		return this;
	}

	addImportedComposables(composables) {
		const content = composables.length > 0 
			? composables.map(imp => `- ${sanitizeTableCell(imp.name)} (\`${sanitizeTableCell(imp.path)}\`)`).join('\n')
			: '- *None specified*';
		this.sections.push(`## Imported Composables\n\n${content}`);
		return this;
	}

	addImportedAssets(assets) {
		const content = assets.length > 0 
			? assets.map(imp => `- ${sanitizeTableCell(imp.name)} (\`${sanitizeTableCell(imp.path)}\`)`).join('\n')
			: '- *None specified*';
		this.sections.push(`## Imported Assets\n\n${content}`);
		return this;
	}

	addProps(props) {
		let table = '| Prop Name | Type | Default | Possible Values | Description |\n| :-------- | :--- | :------ | :-------------- | :---------- |\n';
		if (props && props.length > 0) {
			props.forEach(prop => {
				const propName = sanitizeTableCell(prop.name);
				const type = sanitizeTableCell(prop.type?.name || 'String');
				
				let defaultValue = "''";
				if (prop.defaultValue?.value !== undefined) {
					defaultValue = String(prop.defaultValue.value);
				}
				defaultValue = sanitizeTableCell(defaultValue);
				
				let possibleValues = '-';
				if (prop.values && Array.isArray(prop.values) && prop.values.length > 0) {
					possibleValues = prop.values.join(', ');
				} else if (prop.tags) {
					if (Array.isArray(prop.tags)) {
						const valuesTag = prop.tags.find(t => t.title === 'values');
						if (valuesTag) {
							possibleValues = valuesTag.description || valuesTag.content || '-';
						}
					} else if (typeof prop.tags === 'object' && prop.tags !== null) {
						const valuesTag = prop.tags.values;
						if (valuesTag) {
							possibleValues = Array.isArray(valuesTag) 
								? valuesTag.map(v => v.description || v.content || v).join(', ') 
								: (valuesTag.description || valuesTag.content || valuesTag);
						}
					}
				}
				possibleValues = sanitizeTableCell(possibleValues);

				const desc = sanitizeTableCell(prop.description || '-');
				
				table += `| \`${propName}\` | ${type} | \`${defaultValue}\` | ${possibleValues} | ${desc} |\n`;
			});
		} else {
			table += '| *None* | - | - | - | - |\n';
		}
		this.sections.push(`## Props\n\n${table.trim()}`);
		return this;
	}

	addSectionList(title, items) {
		const content = items && items.length > 0 
			? items.map(item => `- \`${sanitizeTableCell(item.name)}\`: ${sanitizeTableCell(item.description || 'Custom implementation.')}`).join('\n')
			: '- *None specified*';
		this.sections.push(`## ${title}\n\n${content}`);
		return this;
	}

	build() {
		return this.sections.join('\n\n') + '\n';
	}
}

function getVueFiles(dir, fileList = []) {
	if (!fs.existsSync(dir)) return fileList;
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			getVueFiles(filePath, fileList);
		} else if (filePath.endsWith('.vue')) {
			fileList.push(filePath);
		}
	});
	return fileList;
}

// Extract @brief tag via Regex
function parseBriefTag(content) {
	const briefRegex = /@brief\s+([^\r\n*]+)/;
	const match = content.match(briefRegex);
	return match ? match[1].trim() : null;
}

// Extract all import statements via Regex
function parseImports(content) {
	const importRegex = /import\s+([a-zA-Z0-9_-]+)\s+from\s+['"]([^'"]+)['"]/g;
	const imports = [];
	let match;
	while ((match = importRegex.exec(content)) !== null) {
		imports.push({ name: match[1], path: match[2] });
	}
	return imports;
}

// Classify imports into Components, Composables, and Assets
function classifyImports(imports) {
	const components = [];
	const composables = [];
	const assets = [];

	imports.forEach(imp => {
		const p = imp.path.toLowerCase();
		const name = imp.name;

		if (p.includes('composables') || name.startsWith('use')) {
			composables.push(imp);
		} else if (p.match(/\.(png|jpg|jpeg|svg|gif|webp|css|scss)$/) || p.includes('assets') || p.includes('img')) {
			assets.push(imp);
		} else {
			components.push(imp);
		}
	});

	return { components, composables, assets };
}

// Manually parse computed properties and functions/methods from <script setup> blocks
function parseScriptSetupMembers(content) {
	const computedList = [];
	const methodsList = [];

	const memberRegex = /\/\*\*([\s\S]*?)\*\/\s*(?:export\s+)?const\s+([a-zA-Z0-9_$]+)\s*=\s*(?:computed\s*\(|\([^)]*\)\s*=>|function)/g;
	
	let match;
	while ((match = memberRegex.exec(content)) !== null) {
		const commentBlock = match[1];
		const name = match[2];

		const descMatch = commentBlock.match(/(?:^|\s*\*)\s*([^@\r\n][^\r\n]*)/);
		const description = descMatch ? descMatch[1].trim() : 'Documented implementation.';

		if (commentBlock.includes('@private') || name.startsWith('computed') || content.includes(`${name} = computed`)) {
			computedList.push({ name, description });
		} else {
			methodsList.push({ name, description });
		}
	}

	return { computedList, methodsList };
}

async function generateMarkdown() {
	const vueFiles = getVueFiles(componentsDir);
	const timestamp = new Date().toISOString();

	for (const file of vueFiles) {
		try {
			const rawContent = fs.readFileSync(file, 'utf-8');
			
			const docData = await parse(file);
			const allImports = parseImports(rawContent);
			const { components, composables, assets } = classifyImports(allImports);
			const { computedList, methodsList } = parseScriptSetupMembers(rawContent);

			const customBrief = parseBriefTag(rawContent);
			const brief = customBrief || docData.description || 'No description provided.';
			const componentName = docData.displayName || path.basename(file, '.vue');

			const markdownContent = new MarkdownBuilder()
				.setFrontmatter(componentName, timestamp)
				.addOverview(brief)
				.addImportedComponents(components)
				.addImportedComposables(composables)
				.addImportedAssets(assets)
				.addProps(docData.props)
				.addSectionList('Computed Properties & Methods', computedList.length > 0 ? computedList : docData.methods)
				.addSectionList('Slots', docData.slots)
				.addSectionList('Internal Methods', methodsList.length > 0 ? methodsList : docData.methods)
				.build();

			// Determine subfolder based on file path (reusables vs views)
			const relativePath = path.relative(componentsDir, file);
			const subFolder = relativePath.toLowerCase().includes('view') || relativePath.toLowerCase().includes('views') 
				? 'views' 
				: 'reusables';

			const targetOutputDir = path.join(baseDocsDir, subFolder);
			if (!fs.existsSync(targetOutputDir)) {
				fs.mkdirSync(targetOutputDir, { recursive: true });
			}

			const outputFileName = `${componentName.toLowerCase()}.md`;
			fs.writeFileSync(path.join(targetOutputDir, outputFileName), markdownContent);
			console.log(`Generated (${subFolder}): ${componentName}`);

		} catch (error) {
			console.error(`Error parsing ${file}:`, error.message);
		}
	}
}

generateMarkdown();