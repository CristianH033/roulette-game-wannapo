<script setup lang="ts">
import type { RoulletteSegment } from '@/stores/game'
import { ref } from 'vue'

const wheelEl = ref<HTMLImageElement | null>(null)

const props = withDefaults(
  defineProps<{
    segments?: Array<RoulletteSegment>
  }>(),
  {
    segments: () => []
  }
)

let spinning = false

const spinTheWheel = async () => {
  if (spinning) return

  spinning = true

  const totalSegments = props.segments.length
  const valuePerSegment = 360 / totalSegments

  const randomIndex = Math.floor(Math.random() * totalSegments)
  const randomSegment = props.segments[randomIndex]

  const minRevolutions = 10
  const maxRevolutions = 15
  const randomRevolutions =
    Math.floor(Math.random() * (maxRevolutions - minRevolutions + 1)) + minRevolutions

  const startAngle = 0

  const sliceMiddleAngle = valuePerSegment * randomIndex + valuePerSegment / 2

  const toAngle = startAngle + sliceMiddleAngle + 360 * randomRevolutions

  return new Promise<RoulletteSegment>((resolve) => {
    const animation = wheelEl.value?.animate(
      [
        {
          transform: `rotate(${startAngle}deg)`
        },
        {
          transform: `rotate(${toAngle}deg)`
        }
      ],
      {
        duration: 10000,
        fill: 'forwards',
        easing: 'cubic-bezier(.11,-0.09,0,1.01)',
        iterations: 1
      }
    )

    if (animation === undefined) {
      resolve(randomSegment)
      spinning = false
      return
    }

    animation.oncancel = () => {
      spinning = false
      resolve(randomSegment)
    }

    animation.onfinish = () => {
      spinning = false
      resolve(randomSegment)
    }
  })
}

defineExpose({
  spinTheWheel
})
</script>

<template>
  <div class="">
    <div class="max-w-full max-h-full aspect-square relative rounded-full">
      <div class="absolute top-0 left-0 w-full h-full p-[10%]">
        <img
          class="w-full h-full"
          src="@/assets/img/pages/home/wheel.png"
          alt=""
          srcset=""
          ref="wheelEl"
        />
      </div>
      <div class="absolute top-0 left-0 w-full h-full">
        <img
          class="w-full h-full rounded-full"
          src="@/assets/img/pages/home/frame.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="absolute top-0 mx-auto w-full h-[15%] flex justify-center">
        <img
          class="-mt-[2%] w-auto h-full"
          src="@/assets/img/pages/home/indicator.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
</template>
