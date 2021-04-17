import {
	Rule,
	SchematicContext,
	Tree,
	externalSchematic,
	apply,
	url,
	template,
	chain,
	mergeWith,
	MergeStrategy,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function newProject(_options: any): Rule {
	const name = _options.name;

	return (tree: Tree, _context: SchematicContext) => {
		const templateSource = apply(url('./files'), [template({ ..._options, ...strings })]);
		const merged = mergeWith(templateSource, MergeStrategy.Overwrite);
		const rule = chain([
			generateRepo(name, '11.2.9'),
			updatePackageJson(name),
			updateAngularJson(name),
			updateTsconfigJson(name),
			merged
		]);

		return rule(tree, _context) as Rule;
	};
}

function generateRepo(name: string, version: string): Rule {
	return externalSchematic('@schematics/angular', 'ng-new', {
		name,
		version: version,
		strict: true,
		directory: name,
		routing: false,
		style: 'scss',
		inlineStyle: false,
		inlineTemplate: false,
		packageManager: 'yarn',
	});
}

function updatePackageJson(name: string): Rule {
	return (tree: Tree, _: SchematicContext): Tree => {
		const path = `/${name}/package.json`;
		const file = tree.read(path);
		const json = JSON.parse(file!.toString());

		json.dependencies['ngx-build-plus'] = '^11';
		json.dependencies['@ngxs/store'] = '^3.7.1';

		json.devDependencies.tailwindcss = 'latest';
		json.devDependencies.postcss = 'latest';
		json.devDependencies.autoprefixer = 'latest';
		json.devDependencies['postcss-import'] = '^12';
		json.devDependencies['postcss-loader'] = '^4';
		json.devDependencies['postcss-scss'] = '^3';

		tree.overwrite(path, JSON.stringify(json, null, 2));
		return tree;
	};
}

function updateAngularJson(name: string): Rule {
	return (tree: Tree, _: SchematicContext): Tree => {
		const path = `/${name}/angular.json`;
		const file = tree.read(path);
		const json = JSON.parse(file!.toString());

		json.projects[name].architect.build.builder = 'ngx-build-plus:browser';
		json.projects[name].architect.build.options.extraWebpackConfig = 'webpack.config.js';
		
		json.projects[name].architect.serve.builder = 'ngx-build-plus:dev-server';
		json.projects[name].architect.serve.options.extraWebpackConfig = 'webpack.config.js';

		json.projects[name].architect.test.builder = 'ngx-build-plus:karma';
		json.projects[name].architect.test.options.extraWebpackConfig = 'webpack.config.js';

		tree.overwrite(path, JSON.stringify(json, null, 2));
		return tree;
	};
}

function updateTsconfigJson(name: string): Rule {
	return (tree: Tree, _: SchematicContext): Tree => {
		tree.delete(`/${name}/src/app/app.component.scss`);
		tree.delete(`/${name}/src/app/app.component.html`);
		tree.delete(`/${name}/src/app/app.component.spec.ts`);

		const path = `/${name}/tsconfig.json`;
		const file = tree.read(path);
		const comment = file!.toString().match(/\/\*.*/)
		console.log(comment);
		
		const a = file!.toString().replace(/\/\*.*/,'')
		const json = JSON.parse(a);
		json.compilerOptions = {
			...json.compilerOptions,
			"paths": {
				"@assets/*": ["src/assets/*"],
				"@components/*": ["src/app/main/components/*"],
				"@directives/*": ["src/app/core/directives/*"],
				"@environments/*": ["src/environments/*"],
				"@guards/*": ["src/app/core/guards/*"],
				"@models/*": ["src/app/core/models/*"],
				"@pipes/*": ["src/app/core/pipes/*"],
				"@resolvers/*": ["src/app/core/resolvers/*"],
				"@services/*": ["src/app/core/services/*"],
				"@src/*": ["src/*"],
				"@stores/*": ["src/app/core/stores/*"]
			}
		};
		tree.overwrite(path, `${comment}\n${JSON.stringify(json, null, 4)}`);
		console.log(tree);
		
		return tree;
	};
}