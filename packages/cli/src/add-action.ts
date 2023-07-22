import { input, select } from "@inquirer/prompts";
import { addAction } from "./templates-generator";

export default async function (): Promise<void> {
  try {
    const answers = {
      actionTitle: await input({
        message: "What is the new action title? (e.g.: My test action)?",
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }
          return "Please enter the action title";
        },
      }),
      actionDescription: await input({
        message: "What is the new action description? (optional)",
      }),
      actionType: await select({
        message: "Select the action type",
        choices: [
          { name: "Create", value: "create" },
          { name: "Read", value: "read" },
          { name: "Update", value: "update" },
          { name: "Delete", value: "delete" },
        ],
      }),
    };

    addAction({
      key: toPascalCase(answers.actionTitle),
      title: answers.actionTitle,
      description: answers.actionDescription,
      type: answers.actionType,
    });

    console.log("Action is successfully added");
  } catch (error: any) {
    console.log("Error occurred while adding action");
    console.log(error.message);
    return;
  }
}

function toPascalCase(str: string) {
  return str
    .replace(/[^a-zA-Z\s]/g, "") // Remove all non-alphabetic characters
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word and make the rest lowercase
    .join(""); // Join the words back into a single string without spaces
}
