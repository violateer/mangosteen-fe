import { PropType, defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
import s from "./PieChart.module.scss";

export const PieChart = defineComponent({
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
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
    return () => <div ref={refDiv} class={s.wrapper}></div>;
  },
});
