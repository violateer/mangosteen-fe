import { computed, defineComponent, PropType, ref, VNode } from "vue";
import { EmojiSelect } from "./EmojiSelect";
import s from "./Form.module.scss";
import { DatetimePicker, Popup } from "vant";
import { Time } from "./time";
import { Button } from "./Button";
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String as PropType<
        "text" | "emojiSelect" | "date" | "validationcode"
      >,
    },
    error: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  setup: (props, context) => {
    const dateVisible = ref(false);
    const content = computed(() => {
      switch (props.type) {
        case "text":
          return (
            <input
              value={props.modelValue}
              placeholder={props.placeholder}
              onInput={(e: any) =>
                context.emit("update:modelValue", e.target.value)
              }
              class={[s.formItem, s.input]}
            />
          );
        case "emojiSelect":
          return (
            <EmojiSelect
              modelValue={props.modelValue?.toString()}
              onUpdateModelValue={(value) =>
                context.emit("update:modelValue", value)
              }
              class={[s.formItem, s.emojiList]}
            />
          );
        case "validationcode":
          return (
            <>
              <input
                value={props.modelValue}
                placeholder={props.placeholder}
                onInput={(e: any) =>
                  context.emit("update:modelValue", e.target.value)
                }
                class={[s.formItem, s.input, s.validationcodeInput]}
              />
              <Button class={[s.formItem, s.validationcodeButton]}>
                发送验证码
              </Button>
            </>
          );
        case "date":
          return (
            <>
              <input
                readonly={true}
                value={props.modelValue}
                placeholder={props.placeholder}
                onClick={() => {
                  dateVisible.value = true;
                }}
                class={[s.formItem, s.input]}
              />
              <Popup position="bottom" v-model:show={dateVisible.value}>
                <DatetimePicker
                  value={props.modelValue}
                  type="date"
                  title="选择年月日"
                  onConfirm={(date: Date) => {
                    context.emit("update:modelValue", new Time(date).format());
                    dateVisible.value = false;
                  }}
                  onCancel={() => (dateVisible.value = false)}
                />
              </Popup>
            </>
          );
        case undefined:
          return context.slots.default?.();
      }
    });
    return () => {
      return (
        <div class={s.formRow}>
          <label class={s.formLabel}>
            {props.label && <span class={s.formItem_name}>{props.label}</span>}
            <div class={s.formItem_value}>{content.value}</div>
            {
              <div class={s.formItem_errorHint}>
                <span>{props.error ?? "　"}</span>
              </div>
            }
          </label>
        </div>
      );
    };
  },
});
