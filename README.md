# Getting Started With Schematics

To build a new project, simply run

```
schematics .:ng-tailwindcss <project-name> --debug=false
schematics .:ng-tailwindcss menu-rant --debug=false
```

Use the article below as a refresher

https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4











### DEFAULT MESSAGE

To build a new project, simply run the command below:
```bash
yarn new <project-name>
```


### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
 