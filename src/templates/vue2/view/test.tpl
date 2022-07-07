// Test file for {{pascalCase viewName}}

import { shallowMount } from "@vue/test-utils";
import {{pascalCase viewName}} from "@/{{type}}/{{pascalCase viewName}}/{{pascalCase viewName}}.vue";

describe("Tesing {{pascalCase viewName}}.vue", () => {

  it("renders props.msg when passed", () => {
    const msg = "{{pascalCase viewName}}";
    const wrapper = shallowMount({{pascalCase viewName}}, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

});
