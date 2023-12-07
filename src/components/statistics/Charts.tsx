import { PropType, defineComponent, onMounted, ref } from "vue";
import s from "./Charts.module.scss";
import { FormItem } from "../../shared/Form";
import * as echarts from "echarts";

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, context) {
    const category = ref("expenses");
    const refDiv = ref<HTMLDivElement>();
    onMounted(() => {
      if (refDiv.value === undefined) return;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv.value);

      // 指定图表的配置项和数据
      var option: echarts.EChartOption = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        grid: [
          {
            left: 0,
            top: 0,
            right: 0,
            bottom: 20,
          },
        ],
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: "expenses", text: "支出" },
            { value: "income", text: "收入" },
          ]}
          v-model={category.value}
        ></FormItem>
        <div ref={refDiv} class={s.demo}></div>
      </div>
    );
  },
});
