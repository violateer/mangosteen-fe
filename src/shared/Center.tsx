import { PropType, defineComponent, ref } from "vue";
import s from "./Center.module.scss";

export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
  },
  setup(props, context) {
    return () => (
      <div class={[s.center, props.direction]}>{context.slots.default?.()}</div>
    );
  },
});
