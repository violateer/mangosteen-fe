import { PropType, defineComponent, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    return () => (
      <div class={s.itemPage}>
        <MainLayout>
          {{
            title: () => "记一笔",
            icon: () => <Icon name="left" class={s.navIcon} />,
            default: () => (
              <>
                <div>main</div>
              </>
            ),
          }}
        </MainLayout>
      </div>
    );
  },
});
