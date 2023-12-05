import { PropType, defineComponent, reactive, ref, watchEffect } from "vue";
import s from "./ItemList.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { ItemSummary } from "./ItemSummary";
import { Time } from "../../shared/time";
import { Overlay } from "vant";
import { Form, FormItem } from "../../shared/Form";

export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const selected = ref("本月");
    const time = new Time();
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    });
    const timeList = [
      { start: time.firstDayOfMonth(), end: time.lastDayOfMonth() },
      {
        start: time.add(-1, "month").firstDayOfMonth(),
        end: time.add(-1, "month").lastDayOfMonth(),
      },
      { start: time.firstDayOfYear(), end: time.lastDayOfYear() },
    ];
    // watchEffect(() => {
    //   if (selected.value === "自定义时间") {
    //     overlayVisible.value = true;
    //   }
    // });
    const overlayVisible = ref(false);

    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      overlayVisible.value = false;
    };

    return () => (
      <MainLayout>
        {{
          title: () => "山竹记账",
          icon: () => <Icon name="menu" />,
          default: () => (
            <>
              <Tabs
                classPrefix="customTabs"
                v-model:selected={selected.value}
                onUpdate:selected={() => (overlayVisible.value = true)}
              >
                <Tab name="本月">
                  <ItemSummary
                    startDate={timeList[0].start.format()}
                    endDate={timeList[0].end.format()}
                  />
                </Tab>
                <Tab name="上月">
                  <ItemSummary
                    startDate={timeList[1].start.format()}
                    endDate={timeList[1].end.format()}
                  />
                </Tab>
                <Tab name="今年">
                  <ItemSummary
                    startDate={timeList[2].start.format()}
                    endDate={timeList[2].end.format()}
                  />
                </Tab>
                <Tab name="自定义时间">
                  <ItemSummary
                    startDate={customTime.start}
                    endDate={customTime.end}
                  />
                </Tab>
              </Tabs>
              <Overlay show={overlayVisible.value} class={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem
                        label="开始时间"
                        v-model={customTime.start}
                        type="date"
                      ></FormItem>
                      <FormItem
                        label="结束时间"
                        v-model={customTime.end}
                        type="date"
                      ></FormItem>
                      <FormItem>
                        <div class={s.actions}>
                          <button
                            type="button"
                            onClick={() => (overlayVisible.value = false)}
                          >
                            取消
                          </button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
