import { PropType, defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
import s from "./LineChart.module.scss";

export const LineChart = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
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

    return () => <div ref={refDiv} class={s.wrapper}></div>;
  },
});
