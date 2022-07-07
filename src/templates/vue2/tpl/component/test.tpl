// Test file for {{prependIfSub parentViewName}}

import { shallowMount } from "@vue/test-utils";
import {{pascalCase compName}} from "@/{{getComponentType compType}}/{{#if parentViewName}}{{parentViewName}}/{{/if}}{{pascalCase compName}}/{{pascalCase compName}}.vue";

describe("Tesing {{prependIfSub parentViewName}}{{pascalCase compName}}.vue", () => {

  it("renders props.msg when passed", () => {
    const msg = "{{prependIfSub parentViewName}}{{pascalCase compName}}";
    const wrapper = shallowMount({{pascalCase compName}}, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

});
