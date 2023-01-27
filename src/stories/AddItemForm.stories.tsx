import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {userEvent, within} from "@storybook/testing-library";
import {expect} from '@storybook/jest';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            /**
             * here added description of argumenst in the doc table
             */
            name: 'Add item callBack',
            action: 'Item wont to be added',
            description: 'overwritten description',
            table: {
                /**
                 * it is combine args by category and subcategory
                 */
                category: 'callBacks',
                subcategory: 'onClick',
                type: {
                    summary: 'Something short',
                    detail: 'Something really really long',
                },
                defaultValue: {
                    summary: 'Hello World',
                    detail: 'Something',
                },
            },
        },
    },
    parameters: {
        /**
         * set description of a story component
         */
        docs: {
            description: {
                component: 'Add item form from totoList'
            },
        },
    },
    /**
     * provide decorator to every story. something like HOC
     */
    decorators: [
        (Story) => (
            <div style={{margin: '3em'}}>
                <Story/>
            </div>
        ),
    ],
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemWithoutTitle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemWithoutTitle.args = {}


AddItemWithoutTitle.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
    // expect(await  canvas.getByLabelText('Title')).toBeFalsy()
};

export const InputWithText = Template.bind({});
InputWithText.parameters = {
    docs: {
        description: {
            story: '**Correct** work of the AddItemForm',
        },
    },
};
InputWithText.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    /**
     * select specific element(input in this case)
     */
    const input = await canvas.getByLabelText('Title', {
        selector: 'input',
    });
    /**
     * invoke typing in to selected element. delay helps to imitate real typing
     */
    await userEvent.type(input, 'something', {
        delay: 100,
    });
    // await userEvent.click(input)
    // await userEvent.keyboard('Item')
    /**
     * call click on element(button)
     */
    await userEvent.click(canvas.getByRole('button'));
};
export const InputWithErrorBlur = Template.bind({});
InputWithErrorBlur.parameters = {
    docs: {
        /**
         * here declared source code
         */
        source: {
            code: '<h1> I had written this code in the story parameter</h1>',
            language: 'html',
            type: 'auto',
        },
    },
    /**
     * to disable accessibility testing
     */
    a11y: {
        disable: true,
    },
}

InputWithErrorBlur.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const TextArea = await canvas.getByLabelText('Title');


    await userEvent.click(TextArea);
    await userEvent.type(TextArea, 'something', {
        delay: 100,
    });
    await userEvent.clear(TextArea)
    await userEvent.click(canvas.getByRole('button'));
    /**
     * it is checked the document for some text
     */
    await expect(canvas.getByText(
            "Title is required"
        )
    ).toBeInTheDocument();
    /**
     * how to test styles
     */
    await expect(canvas.getByText('Title is required')).toHaveStyle('color: #d32f2f')
};