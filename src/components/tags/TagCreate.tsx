import { PropType, defineComponent, reactive, ref, toRaw } from "vue";
import s from "./Tag.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Rules, resetErrors, validate } from "../../shared/validate";
import { TagForm } from "./TagForm";

export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
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
      console.log(errors);
    };

    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <Icon name="left" onClick={() => {}} />,
          default: () => <TagForm></TagForm>,
        }}
      </MainLayout>
    );
  },
});
