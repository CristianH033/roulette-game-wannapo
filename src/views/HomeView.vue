<script setup lang="ts">
import Roullete from '@/components/Roullete.vue'
import bg from '@/assets/img/pages/home/bg.webp'
import { onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useMotion } from '@vueuse/motion'

const router = useRouter()

const bgEl = ref<HTMLElement | null>(null)
const section1 = ref<HTMLElement | null>(null)
const section2 = ref<HTMLElement | null>(null)
const section3 = ref<HTMLElement | null>(null)
const section4 = ref<HTMLElement | null>(null)

const sectionsScale = [section3, section4]
const sectionsTranlate = [section1, section2]

const wheel = ref<InstanceType<typeof Roullete> | null>(null)
const gameStore = useGameStore()

const spinTheWheel = async () => {
  const segment = await wheel.value?.spinTheWheel()

  if (segment) {
    await setTimeout(() => {
      canRedirect = true
      if (segment.value) {
        router.push({ name: 'question', params: { questionId: segment.id } })
      } else {
        router.push({ name: 'try-again' })
      }
    }, 600)
  }
}

let canRedirect = false
onBeforeRouteLeave(() => {
  if (!canRedirect) {
    return false
  }
})

onMounted(() => {
  sectionsScale.forEach((section, index) => {
    useMotion(section, {
      initial: {
        scale: 0
      },
      enter: {
        scale: 1,
        transition: {
          type: 'spring',

          delay: index * 150
        }
      }
    })
  })

  sectionsTranlate.forEach((section, index) => {
    useMotion(section, {
      initial: {
        y: 100,
        opacity: 0
      },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 200,
          delay: index * 150
        }
      }
    })
  })
})
</script>

<template>
  <div
    class="w-screen h-dvh flex flex-col justify-center items-center"
    :style="{
      backgroundImage: 'url(' + bg + ')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }"
    ref="bgEl"
  >
    <img class="w-12 h-12 fixed top-2 left-2" src="@/assets/img/logos/qlogo.svg" alt="" srcset="" />
    <div class="h-[10%] w-full overflow-hidden p-3" ref="section1">
      <img
        class="object-contain w-full h-full"
        src="@/assets/img/pages/home/logo-crema-n4.webp"
        alt=""
        srcset=""
      />
    </div>
    <div class="h-[20%] w-full overflow-hidden p-3" ref="section2">
      <img
        class="object-contain w-full h-full"
        src="@/assets/img/pages/home/text.webp"
        alt=""
        srcset=""
      />
    </div>
    <div class="h-[65%] max-w-full aspect-square p-3" ref="section3">
      <Roullete :segments="gameStore.segments" class="object-contain w-full h-full" ref="wheel" />
    </div>
    <div class="h-[15%] w-full p-3 flex flex-col justify-center items-start">
      <div class="h-full" ref="section4">
        <img
          class="-mt-3 ml-3 active:scale-125 transition-transform object-contain aspect-square h-full scale-150 origin-center"
          src="@/assets/img/pages/home/button.webp"
          alt=""
          srcset=""
          @click="spinTheWheel"
        />
      </div>
    </div>
    <img
      class="fixed bottom-0 right-0 w-1/2 max-w-xs"
      src="@/assets/img/pages/home/bottom-ribbon.webp"
      alt=""
    />
  </div>
</template>

<style scoped></style>
