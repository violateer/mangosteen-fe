import { PropType, defineComponent, reactive, ref } from "vue";
import s from "./Tag.module.scss";
import { Icon } from "../../shared/Icon";
import { Button } from "../../shared/Button";
import { MainLayout } from "../../layouts/MainLayout";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Rules, resetErrors, validate } from "../../shared/validate";

export const TagEdit = defineComponent({
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
          default: () => (
            <form class={s.form} onSubmit={onSubmit}>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input
                      v-model={formData.name}
                      class={[s.formItem, s.input, s.error]}
                    ></input>
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>
                      {errors["name"] ? (
                        errors["name"][0]
                      ) : (
                        <span class={s.errorText}></span>
                      )}
                    </span>
                  </div>
                </label>
              </div>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号 {formData.sign}</span>
                  <div class={s.formItem_value}>
                    <EmojiSelect
                      v-model={formData.sign}
                      class={[s.formItem, s.emojiList, s.error]}
                    />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>
                      {errors["sign"] ? (
                        errors["sign"][0]
                      ) : (
                        <span class={s.errorText}></span>
                      )}
                    </span>
                  </div>
                </label>
              </div>
              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]}>确定</Button>
                </div>
              </div>
            </form>
          ),
        }}
      </MainLayout>
    );
  },
});
