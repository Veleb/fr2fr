import { Component } from "../models/Component";
import path from "path";
import { ObjectLiteralExpression, Project, Node } from "ts-morph";
import { MetadataInterface } from "types/extractor-types";

async function extractComponentData() {
  try {
    const project = new Project({
      tsConfigFilePath: path.resolve(__dirname, "../../../tsconfig.json"),
    });

    const sourceFilePath = path.resolve(
      __dirname,
      "../../../example/components/contact-basic/contact.component.ts"
      // "../../../example/components/hero/hero.component.ts"

    );

    const sourceFile = project.addSourceFileAtPath(sourceFilePath);

    if (!sourceFile) {
      throw new Error(`Source file not found at path: ${sourceFilePath}`);
    }

    const classes = sourceFile.getClasses();

    if (!classes || classes.length === 0) {
      throw new Error(`No classes found in source file: ${sourceFilePath}`);
    }

    const component = new Component();

    classes.forEach(( cls ) => {
      const name = cls.getName();

      if (!name) {
        throw new Error("Encountered a class without a name.");
      }

      component.setName(name);

      const decorator = cls.getDecorators()[0];

      if (!decorator) {
        throw new Error("Encountered a class without a decorator.");
      }

      component.setDecorator(decorator.getName());

      const decoratorArgs = decorator.getArguments()[0];

      const properties = (decoratorArgs as ObjectLiteralExpression).getProperties();
      const metadata: MetadataInterface = {}

      properties.forEach(( property ) => {
        if (Node.isPropertyAssignment(property)) {
          const name = property.getName();

          if (!name) {
            throw new Error('Encountered a decorator property without a name.')
          }
          
          let value = property.getInitializer()?.getText();
          
          if (!value) {
            throw new Error('Encountered a decorator property without a value.')
          }

           if (value.startsWith("'") && value.endsWith("'")) {
             value = value.slice(1, -1);
           }

          metadata[name] = value;
        }
      })

      if (!metadata) {
        throw new Error(`Encountered a decorator with no metadata.`);
      }

      component.setMetadata(metadata);

      console.log(component);
      

    })
        

    return component;
  } catch (err) {
    console.error("Error extracting component data:", err);
    throw err; 
  }
}

export default extractComponentData;
