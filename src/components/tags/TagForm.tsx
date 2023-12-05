import { defineComponent, reactive } from "vue";
import s from "./Tag.module.scss";
import { Button } from "../../shared/Button";
import { Rules, resetErrors, validate } from "../../shared/validate";
import { Form, FormItem } from "../../shared/Form";

export const TagForm = defineComponent({
  setup(props, context) {
    const formData = reactive({
      name: "",
      sign: "",
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});

    const onSubmit = (e: Event) => {
      e.preventDefault();

      const rules: Rules<typeof formData> = [
        {
          key: "name",
          type: "required",
          message: "必填",
        },
        {
          key: "name",
          type: "pattern",
          regex: /^.{1,4}$/,
          message: "只能填1~4个字符",
        },
        { key: "sign", type: "required", message: "必填" },
      ];

      resetErrors(errors);
      Object.assign(errors, validate(formData, rules));
    };

    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名"
          type="text"
          v-model={formData.name}
          error={errors["name"]?.[0]}
        />
        <FormItem
          label={"符号 " + formData.sign}
          type="emojiSelect"
          v-model={formData.sign}
          error={errors["sign"]?.[0]}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button class={[s.button]}>确定</Button>
        </FormItem>
      </Form>
    );
  },
});
