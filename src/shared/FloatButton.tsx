import { defineComponent, ref } from "vue";
import { Icon } from "../shared/Icon";
import s from "./FloatButton.module.scss";

export const FloatButton = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.floatButton}>
        <Icon name="add" class={s.icon} />
      </div>
    );
  },
});