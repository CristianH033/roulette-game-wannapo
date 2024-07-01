<script setup lang="ts">
import bgCalendula from '@/assets/img/pages/questions/bg-calendula.png'
import bgCapaLigera from '@/assets/img/pages/questions/bg-capa-ligera.png'
import bgCapaTransparente from '@/assets/img/pages/questions/bg-capa-transparente.png'
import bgNistatina from '@/assets/img/pages/questions/bg-nistatina.png'
import bgOxidoZinc from '@/assets/img/pages/questions/bg-oxido-zinc.png'
import bgTryAgain from '@/assets/img/pages/questions/bg-try-again.png'
import buttonSpin from '@/assets/img/pages/questions/button-spin.png'
import calendulaQuestion from '@/assets/img/pages/questions/calendula-question.png'
import calendula from '@/assets/img/pages/questions/calendula.png'
import capaLigeraQuestion from '@/assets/img/pages/questions/capa-ligera-question.png'
import capaLigera from '@/assets/img/pages/questions/capa-ligera.png'
import capaTransparenteQuestion from '@/assets/img/pages/questions/capa-transparente-question.png'
import capaTransparente from '@/assets/img/pages/questions/capa-transparente.png'
import nistatinaQuestion from '@/assets/img/pages/questions/nistatina-question.png'
import nistatina from '@/assets/img/pages/questions/nistatina.png'
import oxidoZincQuestion from '@/assets/img/pages/questions/oxido-zinc-question.png'
import oxidoZinc from '@/assets/img/pages/questions/oxido-zinc.png'
import ribbon from '@/assets/img/pages/questions/ribbon.png'
import tryAgainQuestion from '@/assets/img/pages/questions/try-again-question.png'
import tryAgain from '@/assets/img/pages/questions/try-again.png'
import { useMotion } from '@vueuse/motion'
import { computed, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

const section1 = ref<HTMLElement | null>(null)
const section2 = ref<HTMLElement | null>(null)
const ribbonEl = ref<HTMLElement | null>(null)
const section3 = ref<HTMLElement | null>(null)
const section4 = ref<HTMLElement | null>(null)

const router = useRouter()

const sectionsScale = [section2, section4]
const sectionsTranlate = [section1, ribbonEl, section3]

let canRedirect = false

onBeforeRouteLeave(() => {
  if (!canRedirect) {
    return false
  }

  const sections = [section4, section3, section2, ribbonEl, section1]
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

const questionBackground = computed(() => {
  const qId = router.currentRoute.value.params.questionId

  switch (qId) {
    case '2':
      return bgOxidoZinc
    case '3':
      return bgCalendula
    case '5':
      return bgCapaTransparente
    case '6':
      return bgNistatina
    case '8':
      return bgCapaLigera
    default:
      return bgTryAgain
  }
})

const questionLogo = computed(() => {
  const qId = router.currentRoute.value.params.questionId

  switch (qId) {
    case '2':
      return oxidoZinc
    case '3':
      return calendula
    case '5':
      return capaTransparente
    case '6':
      return nistatina
    case '8':
      return capaLigera
    default:
      return tryAgain
  }
})

const questionText = computed(() => {
  const qId = router.currentRoute.value.params.questionId as string

  switch (qId) {
    case '2':
      return oxidoZincQuestion
    case '3':
      return calendulaQuestion
    case '5':
      return capaTransparenteQuestion
    case '6':
      return nistatinaQuestion
    case '8':
      return capaLigeraQuestion
    default:
      return tryAgainQuestion
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
      backgroundImage: 'url(' + questionBackground + ')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }"
  >
    <img class="w-12 h-12 fixed top-2 left-2" src="@/assets/img/logos/qlogo.svg" alt="" srcset="" />
    <div class="h-[15%] w-full flex flex-col items-center justify-center py-4 px-8 pt-12 scale-125">
      <img
        class="object-contain w-full h-full"
        src="@/assets/img/pages/home/logo-crema-n4.png"
        alt=""
        srcset=""
        ref="section1"
      />
    </div>
    <div class="h-[15%] w-full py-4 px-8" ref="ribbonEl">
      <img
        class="object-contain w-full h-full scale-110 origin-top"
        :src="ribbon"
        alt=""
        srcset=""
      />
    </div>
    <div class="h-[25%] w-full py-4 px-8 scale-110">
      <img
        class="object-contain w-full h-full"
        :src="questionLogo"
        alt=""
        srcset=""
        ref="section2"
      />
    </div>
    <div class="h-[20%] w-[30rem] max-w-full py-4 px-8">
      <img
        class="object-contain w-full h-full"
        :src="questionText"
        alt=""
        srcset=""
        ref="section3"
      />
    </div>
    <div class="h-[25%] w-full py-4 px-8 pb-12" ref="section4">
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
