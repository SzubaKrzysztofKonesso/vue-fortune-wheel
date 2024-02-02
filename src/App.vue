<template>
  <div id="app" class="container">
    <div class="row">
      <div class="row">
        <div class="col-md-12">
          <div class="col-md-9 flex-row">
            <div v-for="level in answearsAndQuestions" key="index" class="level">{{ level.index }}</div>
          </div>
          <div class="col-md-3">
            <div class="">punkty</div>
            <div class="" clas="totalPoints">{{ totalPoints }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <h2>Pytanie pomocnicze</h2>
        <h3>{{ answearsAndQuestions[currentQuestion].question }}</h3>
        <div class="answerBoard">
          <div class="letter" v-for="(revealed, index) in currentAnswerRevealed" :key="index">
            {{ revealed ? currentAnswer[index] : '-' }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <h2> wylosowałeś: <span v-show="prizeValue">{{ prizeValue }}</span> </h2>
      <FortuneWheel style="width: 500px; max-width: 100%;" :verify="canvasVerify" :canvas="canvasOptions"
        :prizes="prizesCanvas" @rotateStart="onCanvasRotateStart" @rotateEnd="onRotateEnd" />
      <div v-if="showAlphabet" class="lettersBoard">
        <div v-for="letter in letters" :key="`letter-${letter}`" @click="letterClicked(letter)" class="letter"
          :class="{ 'clicked': clickedLetters.includes(letter) }">{{ letter }}</div>

        {{ clickedLetters }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import FortuneWheel from './components/FortuneWheel/index.vue'
import { PrizeConfig } from './components/FortuneWheel/types'
import { prizesCanvas } from './helpers.ts'


// stan canvas
// 
const canvasVerify = ref(false)
const verifyDuration = 1
const canvasOptions = {
  btnWidth: 140,
  borderColor: '#584b43',
  borderWidth: 6,
  lineHeight: 30
}
// 
// end stan canvas

// stan gry
const prizeValue = ref('')
type Letters = 'P' | 'A' | 'R' | 'I' | 'S' | 'F' | 'G' | 'H' | 'I' | 'J'
type answearsAndQuestions = { index: number, question: string, answer: string, levelPoints: string }

const totalPoints = ref(0)
const letterUsed = ref<Letters[]>([]);
const currentLevel = ref(0)
const currentQuestion = ref(0)
const letters: Letters[] = ['P', 'A', 'R', 'I', 'S', 'F', 'G', 'H', 'I', 'J']
const answearsAndQuestions: answearsAndQuestions[] = [{ index: 1, question: 'What is the capital of France?', answer: 'Paris', levelPoints: '1000' }, { index: 2, question: 'What is the capital of Germany?', answer: 'Berlin', levelPoints: '2000' }, { index: 3, question: 'What is the capital of Italy?', answer: 'Rome', levelPoints: '1000' }]
const totalLevels = answearsAndQuestions.length

let canClickLetter = false
let showAlphabet = false
const currentAnswer = computed(() => answearsAndQuestions[currentQuestion.value].answer);
const currentAnswerRevealed = ref(new Array(currentAnswer.value.length).fill(false));
const clickedLetters = ref<Letters[]>([]);


// obserwator który uruchamia się po zmianie pytania
watch(currentQuestion, () => {
  currentAnswerRevealed.value = new Array(currentAnswer.value.length).fill(false);
  clickedLetters.value = []; //reset po przejściu do nowego pytania
});


// funkcja która wywołana jest przez onCanvasRotateStart się po kliknięciu w koło
function testRequest(verified: boolean, duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(verified)
    }, duration)
  })
}
// funkcja uruchamiana po kliknięciu w koło
function onCanvasRotateStart(rotate: Function) {
  if (canvasVerify.value) {
    const verified = true
    testRequest(verified, verifyDuration * 1000).then((verifiedRes) => {
      if (verifiedRes) {
        rotate()
        canvasVerify.value = false
      } else {
        alert('restart canvas')
      }
    })
    return
  }
  console.log('onCanvasRotateStart')
}

// funkcja uruchamiana po zakończeniu obrotu koła
function onRotateEnd(prize: PrizeConfig) {
  console.log('onCanvasRotateEnd', prize)
  updatePrizeValue(prize)
  canClickLetter = true
  showAlphabet = true
}

// funkcja uruchamiana po kliknięciu w literę
function updatePrizeValue(prize: PrizeConfig) {
  prizeValue.value = prize.value
}

// funkcja uruchamiana po kliknięciu w literę
function letterClicked(letter: Letters) {
  if (!canClickLetter) return;
  const answer = currentAnswer.value.toUpperCase();
  let updated = false;
  debugger;
  const newRevealed = currentAnswerRevealed.value.map((revealed, index) => {
    if (answer[index] === letter) {
      updated = true;
      return true;
    }
    return revealed;
  });

  if (updated) {
    currentAnswerRevealed.value = newRevealed;
    clickedLetters.value.push(letter);
  } else {
    alert('Wrong letter!');
  }
}

</script>

<style lang="scss" scoped>
@import './styles/bootstrap-grid.min.css';
@import './style.scss';

.lettersBoard,
.answerBoard {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  outline: 1px solid #000;
  // max-width: 20px;

  .letter {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    margin: 2px;
  }

  .letter.clicked {
    background-color: #cccccc;
    pointer-events: none;
  }
}

.level {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  margin: 2px;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>