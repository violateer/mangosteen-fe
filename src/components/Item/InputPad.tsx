import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { Time } from "../../shared/time";
import s from "./InputPad.module.scss";
import { DatetimePicker, NumberKeyboard, Popup } from "vant";
export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    const appendText = (n: number | string) => {
      const nString = n.toString();
      const dotIndex = amount.value.indexOf(".");
      if (amount.value.length >= 13) {
        return;
      }
      if (dotIndex >= 0 && amount.value.length - dotIndex > 2) {
        return;
      }
      if (nString === ".") {
        if (dotIndex >= 0) {
          // 已经有小数点了
          return;
        }
      } else if (nString === "0") {
        // 没有小数点
        if (amount.value === "0") {
          // 没小数点，但是有0
          return;
        }
      } else {
        if (amount.value === "0") {
          amount.value = "";
        }
      }
      amount.value += n.toString();
    };
    const buttons = [
      {
        text: "1",
        onClick: () => {
          appendText(1);
        },
      },
      {
        text: "2",
        onClick: () => {
          appendText(2);
        },
      },
      {
        text: "3",
        onClick: () => {
          appendText(3);
        },
      },
      {
        text: "4",
        onClick: () => {
          appendText(4);
        },
      },
      {
        text: "5",
        onClick: () => {
          appendText(5);
        },
      },
      {
        text: "6",
        onClick: () => {
          appendText(6);
        },
      },
      {
        text: "7",
        onClick: () => {
          appendText(7);
        },
      },
      {
        text: "8",
        onClick: () => {
          appendText(8);
        },
      },
      {
        text: "9",
        onClick: () => {
          appendText(9);
        },
      },
      {
        text: ".",
        onClick: () => {
          appendText(".");
        },
      },
      {
        text: "0",
        onClick: () => {
          appendText(0);
        },
      },
      {
        text: "清空",
        onClick: () => {
          amount.value = "0";
        },
      },
      {
        text: "提交",
        onClick: () => {
          context.emit("update:amount", parseFloat(amount.value) * 100);
          props.onSubmit?.();
        },
      },
    ];
    const datePickerVisible = ref(false);
    const toggleDatePicker = () =>
      (datePickerVisible.value = !datePickerVisible.value);
    const setDate = (date: Date) => {
      context.emit("update:happenAt", date.toISOString());
      toggleDatePicker();
    };
    const amount = ref(props.amount ? (props.amount / 100).toString() : "0");
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={toggleDatePicker}>
                {new Time(props.happenAt).format()}
              </span>
              <Popup position="bottom" v-model:show={datePickerVisible.value}>
                <DatetimePicker
                  modelValue={
                    props.happenAt ? new Date(props.happenAt) : new Date()
                  }
                  type="date"
                  title="选择年月日"
                  onConfirm={setDate}
                  onCancel={toggleDatePicker}
                />
              </Popup>
            </span>
          </span>
          <span class={s.amount}>{amount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});
