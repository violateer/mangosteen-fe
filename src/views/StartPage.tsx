import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import s from "./StartPage.module.scss";

export const StartPage = defineComponent({
  setup(props, context) {
    const onClick = () => {
      console.log(123);
    };
    return () => (
      <div>
        <div class={s.button_wrapper} onClick={onClick}>
          <Button class={s.button}>测试</Button>
        </div>
      </div>
    );
  },
});
