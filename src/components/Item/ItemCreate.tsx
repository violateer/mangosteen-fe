import { PropType, defineComponent, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";

export const ItemCreate = defineComponent({
  setup(props, context) {
    const kind = ref("支出");
    const expensesTags = ref([
      { id: 1, name: "餐费", sign: "￥", category: "expenses" },
      { id: 2, name: "打车", sign: "￥", category: "expenses" },
      { id: 3, name: "聚餐", sign: "￥", category: "expenses" },
      { id: 4, name: "打车", sign: "￥", category: "expenses" },
      { id: 5, name: "聚餐", sign: "￥", category: "expenses" },
      { id: 6, name: "打车", sign: "￥", category: "expenses" },
      { id: 7, name: "聚餐", sign: "￥", category: "expenses" },
    ]);
    const incomeTags = ref([
      { id: 4, name: "工资", sign: "￥", category: "income" },
      { id: 5, name: "彩票", sign: "￥", category: "income" },
      { id: 6, name: "滴滴", sign: "￥", category: "income" },
      { id: 11, name: "彩票", sign: "￥", category: "income" },
      { id: 18, name: "滴滴", sign: "￥", category: "income" },
      { id: 17, name: "彩票", sign: "￥", category: "income" },
      { id: 19, name: "滴滴", sign: "￥", category: "income" },
      { id: 4, name: "工资", sign: "￥", category: "income" },
      { id: 5, name: "彩票", sign: "￥", category: "income" },
      { id: 6, name: "滴滴", sign: "￥", category: "income" },
      { id: 11, name: "彩票", sign: "￥", category: "income" },
      { id: 18, name: "滴滴", sign: "￥", category: "income" },
      { id: 17, name: "彩票", sign: "￥", category: "income" },
      { id: 19, name: "滴滴", sign: "￥", category: "income" },
      { id: 4, name: "工资", sign: "￥", category: "income" },
      { id: 5, name: "彩票", sign: "￥", category: "income" },
      { id: 6, name: "滴滴", sign: "￥", category: "income" },
      { id: 11, name: "彩票", sign: "￥", category: "income" },
      { id: 18, name: "滴滴", sign: "￥", category: "income" },
      { id: 17, name: "彩票", sign: "￥", category: "income" },
      { id: 19, name: "滴滴", sign: "￥", category: "income" },
      { id: 4, name: "工资", sign: "￥", category: "income" },
      { id: 5, name: "彩票", sign: "￥", category: "income" },
      { id: 6, name: "滴滴", sign: "￥", category: "income" },
      { id: 11, name: "彩票", sign: "￥", category: "income" },
      { id: 18, name: "滴滴", sign: "￥", category: "income" },
      { id: 17, name: "彩票", sign: "￥", category: "income" },
      { id: 19, name: "滴滴", sign: "￥", category: "income" },
      { id: 4, name: "工资", sign: "￥", category: "income" },
      { id: 5, name: "彩票", sign: "￥", category: "income" },
      { id: 6, name: "滴滴", sign: "￥", category: "income" },
      { id: 11, name: "彩票", sign: "￥", category: "income" },
      { id: 18, name: "滴滴", sign: "￥", category: "income" },
      { id: 17, name: "彩票", sign: "￥", category: "income" },
      { id: 19, name: "滴滴", sign: "￥", category: "income" },
    ]);
    const formData = reactive<Partial<Item>>({
      kind: "expenses",
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });

    const onSubmit = () => {};
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={kind.value} class={s.tabs}>
                  <Tab name="支出" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {expensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {incomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
