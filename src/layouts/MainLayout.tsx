import { PropType, defineComponent, ref } from "vue";
import s from "./MainLayout.module.scss";
import { Navbar } from "../shared/Navbar";
import { Icon } from "../shared/Icon";

export const MainLayout = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <Navbar class={s.navbar}>
          {{
            default: () => context.slots.title?.(),
            icon: () => context.slots.icon?.(),
          }}
        </Navbar>
        {context.slots.default?.()}
      </div>
    );
  },
});
