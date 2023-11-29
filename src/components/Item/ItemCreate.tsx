import { PropType, defineComponent, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";

export const ItemCreate = defineComponent({
  setup(props, context) {
    const kind = ref("支出");
    return () => (
      <div class={s.itemPage}>
        <MainLayout>
          {{
            title: () => "记一笔",
            icon: () => <Icon name="left" class={s.navIcon} />,
            default: () => (
              <>
                <Tabs
                  selected={kind.value}
                  onUpdateSelected={(name: string) => (kind.value = name)}
                >
                  <Tab name="支出">icon 列表</Tab>
                  <Tab name="收入">icon 列表2</Tab>
                </Tabs>
              </>
            ),
          }}
        </MainLayout>
      </div>
    );
  },
});
