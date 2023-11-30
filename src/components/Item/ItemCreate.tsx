import { PropType, defineComponent, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";

export const ItemCreate = defineComponent({
  setup(props, context) {
    const kind = ref("支出");
    const formData = reactive<Partial<Item>>({
      kind: "expenses",
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });

    const onSubmit = () => {};
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

                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </>
            ),
          }}
        </MainLayout>
      </div>
    );
  },
});
