import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import s from "./StartPage.module.scss";
import { FloatButton } from "../shared/FloatButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
import { RouterLink } from "vue-router";

export const StartPage = defineComponent({
  setup(props, context) {
    const overlayVisible = ref(false);
    const toggleMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    };
    return () => (
      <div>
        <Navbar>
          {{
            default: () => "山竹记账",
            icon: () => (
              <Icon name="menu" class={s.navIcon} onClick={toggleMenu} />
            ),
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <div class={s.button_wrapper}>
          <RouterLink to="/items/create">
            <Button class={s.button}>开始记账</Button>
            <FloatButton></FloatButton>
          </RouterLink>

          {overlayVisible.value && <Overlay onClose={toggleMenu} />}
        </div>
      </div>
    );
  },
});
