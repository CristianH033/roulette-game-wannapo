<script setup lang="ts">
import bgTryAgain from '@/assets/img/pages/questions/bg-try-again.png'
import buttonSpin from '@/assets/img/pages/questions/button-spin.png'
import tryAgainQuestion from '@/assets/img/pages/questions/try-again-question.png'
import tryAgain from '@/assets/img/pages/questions/try-again.png'
import { useMotion } from '@vueuse/motion'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const section1 = ref<HTMLElement | null>(null)
const section2 = ref<HTMLElement | null>(null)
const section3 = ref<HTMLElement | null>(null)
const section4 = ref<HTMLElement | null>(null)

const sectionsScale = [section2, section4]
const sectionsTranlate = [section1, section3]

let canRedirect = false

onBeforeRouteLeave(() => {
  if (!canRedirect) {
    return false
  }

  const sections = [section4, section3, section2, section1]
  return new Promise<void>((resolve) => {
    sections.forEach((section, index) => {
      useMotion(section, {
        initial: {
          scale: 1,
          opacity: 1
        },
        enter: {
          scale: 0,
          opacity: 0,
          transition: {
            type: 'spring',
            stiffness: 80,
            delay: index * 150,
            onComplete: () => {
              resolve()
            }
          }
        }
      })
    })
  })
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
          stiffness: 200,
          delay: (index + 1) * 250
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
          delay: index * 250
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
      backgroundImage: 'url(' + bgTryAgain + ')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }"
  >
    <img class="w-12 h-12 fixed top-2 left-2" src="@/assets/img/logos/qlogo.svg" alt="" srcset="" />
    <div class="h-[20%] w-full flex flex-col items-center justify-center py-4 px-8">
      <img
        class="object-contain w-full h-full"
        src="@/assets/img/pages/home/logo-crema-n4.png"
        alt=""
        srcset=""
        ref="section1"
      />
    </div>
    <div class="h-[30%] w-full py-4 px-8">
      <img class="object-contain w-full h-full" :src="tryAgain" alt="" srcset="" ref="section2" />
    </div>
    <div class="h-[30%] w-[30rem] max-w-full py-4 px-8">
      <img
        class="object-contain w-full h-full"
        :src="tryAgainQuestion"
        alt=""
        srcset=""
        ref="section3"
      />
    </div>
    <div class="h-[20%] w-full py-4 px-8" ref="section4">
      <RouterLink to="/" v-slot="{ navigate }">
        <img
          class="active:scale-95 transition-transform object-contain w-full h-full"
          :src="buttonSpin"
          alt=""
          srcset=""
          @click="() => (canRedirect = true) && navigate()"
        />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
