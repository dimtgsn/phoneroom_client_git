<template id="reviews">
  <div>
    <div class="section-review">
      <div class="review-title title">Отзывы</div>
      <div class="review-body">
        <div class="review_total">
          <div class="total_content">
            <div class="review_left">
              <div class="total-rating">
                <h2 class="rating_medium">{{ props.rating }}</h2>
                <div class="rating_body main-rating" v-if="windowWidth >= 1280">
                  <ClientOnly>
                    <star-rating :star-size="12"
                                 :rating="props.rating"
                                 :read-only="true"
                                 :increment="0.01"
                                 :padding="2"
                                 :show-rating="false"
                                 :round-start-rating="1"
                                 :inline="true"
                                 :rounded-corners="false"
                                 inactive-color="#909CB5"
                                 active-color="#F99808"
                                 :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                  </ClientOnly>
                </div>
                <div class="rating_body main-rating" v-if="windowWidth < 1280 && windowWidth > 1020">
                  <ClientOnly>
                    <star-rating :star-size="10"
                                 :rating="props.rating"
                                 :read-only="true"
                                 :increment="0.01"
                                 :padding="2"
                                 :show-rating="false"
                                 :round-start-rating="1"
                                 :inline="true"
                                 :rounded-corners="false"
                                 inactive-color="#909CB5"
                                 active-color="#F99808"
                                 :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                  </ClientOnly>
                </div>
                <div class="rating_body main-rating" v-if="windowWidth <= 1020">
                  <ClientOnly>
                    <star-rating :star-size="8"
                                 :rating="props.rating"
                                 :read-only="true"
                                 :increment="0.01"
                                 :padding="2"
                                 :show-rating="false"
                                 :round-start-rating="1"
                                 :inline="true"
                                 :rounded-corners="false"
                                 inactive-color="#909CB5"
                                 active-color="#F99808"
                                 :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                  </ClientOnly>
                </div>
              </div>
              <div class="total">
                {{ props.comments_count  }}
                {{ props.comments_count % 10 === 1 ? 'отзыв':'' }}
                {{ props.comments_count % 10 === 2 || props.comments_count % 10 === 3 || props.comments_count % 10 === 4  ? 'отзыва':'' }}
                {{ props.comments_count % 10 >= 5 || props.comments_count % 10 === 0 ? 'отзывов':'' }}
              </div>
              <div class="btn_review">
                <Button :route_btn="'#writeRate'" v-if="windowWidth >= 640" :src_btn="'img/review.svg'"  :width_btn="12">Написать отзыв</Button>
                <Button :route_btn="'#writeRate'" v-if="windowWidth < 640" :src_btn="'img/review-max.svg'"  :width_btn="5"></Button>
              </div>
            </div>
            <div class="review_right">
              <div class="ratings">
                <div class="rating-item">
                  <div class="rating_body" v-if="windowWidth >= 1280">
                    <ClientOnly>
                      <star-rating :star-size="12"
                                   :rating="5"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth < 1280 && windowWidth > 1020">
                    <ClientOnly>
                      <star-rating :star-size="10"
                                   :rating="5"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth <= 1020">
                    <ClientOnly>
                      <star-rating :star-size="8"
                                   :rating="5"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <h4 class="total label_star">
                    ({{ props.comments_count_5  }})
                    {{ props.comments_count_5 % 10 === 1 ? 'отзыв':'' }}
                    {{ props.comments_count_5 % 10 === 2 || props.comments_count_5 % 10 === 3 || props.comments_count_5 % 10 === 4  ? 'отзыва':'' }}
                    {{ props.comments_count_5 % 10 >= 5 || props.comments_count_5 % 10 === 0 ? 'отзывов':'' }}
                  </h4>
                </div>
                <div class="rating-item">
                  <div class="rating_body" v-if="windowWidth >= 1280">
                    <ClientOnly>
                      <star-rating :star-size="12"
                                   :rating="4"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth < 1280 && windowWidth > 1020">
                    <ClientOnly>
                      <star-rating :star-size="10"
                                   :rating="4"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth <= 1020">
                    <ClientOnly>
                      <star-rating :star-size="8"
                                   :rating="4"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <h4 class="total label_star">
                    ({{ props.comments_count_4  }})
                    {{ props.comments_count_4 % 10 === 1 ? 'отзыв':'' }}
                    {{ props.comments_count_4 % 10 === 2 || props.comments_count_4 % 10 === 3 || props.comments_count_4 % 10 === 4  ? 'отзыва':'' }}
                    {{ props.comments_count_4 % 10 >= 5 || props.comments_count_4 % 10 === 0 ? 'отзывов':'' }}
                  </h4>
                </div>
                <div class="rating-item">
                  <div class="rating_body" v-if="windowWidth >= 1280">
                    <ClientOnly>
                      <star-rating :star-size="12"
                                   :rating="3"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth < 1280 && windowWidth > 1020">
                    <ClientOnly>
                      <star-rating :star-size="10"
                                   :rating="3"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth <= 1020">
                    <ClientOnly>
                      <star-rating :star-size="8"
                                   :rating="3"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <h4 class="total label_star">
                    ({{ props.comments_count_3  }})
                    {{ props.comments_count_3 % 10 === 1 ? 'отзыв':'' }}
                    {{ props.comments_count_3 % 10 === 2 || props.comments_count_3 % 10 === 3 || props.comments_count_3 % 10 === 4  ? 'отзыва':'' }}
                    {{ props.comments_count_3 % 10 >= 5 || props.comments_count_3 % 10 === 0 ? 'отзывов':'' }}
                  </h4>
                </div>
                <div class="rating-item">
                  <div class="rating_body" v-if="windowWidth >= 1280">
                    <ClientOnly>
                      <star-rating :star-size="12"
                                   :rating="2"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth < 1280 && windowWidth > 1020">
                    <ClientOnly>
                      <star-rating :star-size="10"
                                   :rating="2"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth <= 1020">
                    <ClientOnly>
                      <star-rating :star-size="8"
                                   :rating="2"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <h4 class="total label_star">
                    ({{ props.comments_count_2  }})
                    {{ props.comments_count_2 % 10 === 1 ? 'отзыв':'' }}
                    {{ props.comments_count_2 % 10 === 2 || props.comments_count_2 % 10 === 3 || props.comments_count_2 % 10 === 4  ? 'отзыва':'' }}
                    {{ props.comments_count_2 % 10 >= 5 || props.comments_count_2 % 10 === 0 ? 'отзывов':'' }}
                  </h4>
                </div>
                <div class="rating-item">
                  <div class="rating_body" v-if="windowWidth >= 1280">
                    <ClientOnly>
                      <star-rating :star-size="12"
                                   :rating="1"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth < 1280 && windowWidth > 1020">
                    <ClientOnly>
                      <star-rating :star-size="10"
                                   :rating="1"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <div class="rating_body" v-if="windowWidth <= 1020">
                    <ClientOnly>
                      <star-rating :star-size="8"
                                   :rating="1"
                                   :read-only="true"
                                   :padding="2"
                                   :show-rating="false"
                                   :round-start-rating="1"
                                   :inline="true"
                                   :rounded-corners="false"
                                   inactive-color="#909CB5"
                                   active-color="#F99808"
                                   :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </ClientOnly>
                  </div>
                  <h4 class="total label_star">
                    ({{ props.comments_count_1  }})
                    {{ props.comments_count_1 % 10 === 1 ? 'отзыв':'' }}
                    {{ props.comments_count_1 % 10 === 2 || props.comments_count_1 % 10 === 3 || props.comments_count_1 % 10 === 4  ? 'отзыва':'' }}
                    {{ props.comments_count_1 % 10 >= 5 || props.comments_count_1 % 10 === 0 ? 'отзывов':'' }}
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="write_review">
          <div v-if="props.comments_count === 0">
            <h2 class="first_review">Отзывов к данному товару нет. Будьте первым и поделитесь своим мнением об этом товаре</h2>
            <Button :route_btn="'#writeRate'" :width_btn="12">Написать отзыв</Button>
          </div>
          <div v-else>
            <div v-if="pending">
              <section class="wrapper-pen">
                <article class="article">
                  <div class="bg">
                    <div class="icons">
                      <div class="icon-2 icon-2-2"></div>
                      <div class="mask"></div>
                    </div>
                  </div>
                </article>
              </section>
            </div>
            <section v-else class="comments-section">
              <div class="comments" v-for="comment in comments.comments">
                <div class="comment">
                  <div style="display: none" v-if="props.user">
                    <div v-if="comment.user_id === props.user.id">
                      {{ userWritedComment = true }}
                      {{ disabledText = 'Отзыв на данный товар успешно отправлен.' }}
                      <div v-if="comment.can_update">
                        {{ current_rating = comment.rating }}
                        {{ current_comment = comment.comment }}
                        {{ current_advantages = comment.advantages }}
                        {{ current_disadvantages = comment.disadvantages }}
                        {{ comment_id = comment.id }}
                      </div>
                      <div v-else>
                        {{ dayPassed = true }}
                      </div>
                    </div>
                  </div>
                  <div class="comment-header">
                    <div class="rating_circle">{{ comment.rating }}<span style="font-size: 1rem;">&#9733;</span></div>
                    <div class="comment_info">
                      <h3 class="comment_user">{{ comment.user }}</h3>
                      <h3 class="comment_date">{{ comment.created_at }}</h3>
                    </div>
                  </div>
                  <div class="comment_body">
                    <div class="comment_advantages text_block">
                      <h3 class="comment_text_title">Достоинства:</h3>
                      <div class="comment_text">{{ comment.advantages }}</div>
                    </div>
                    <div class="comment_disadvantages text_block">
                      <h3 class="comment_text_title">Недостатки:</h3>
                      <div class="comment_text">{{ comment.disadvantages }}</div>
                    </div>
                    <div class="comment_comment text_block">
                      <h3 class="comment_text_title">Отзыв:</h3>
                      <div class="comment_text">{{ comment.comment }}</div>
                    </div>
                  </div>
                  <div v-if="comments.answers.length !== 0" v-for="answer in comments.answers">
                    <div class="comment_answer" v-if="comment.answer_id === answer.id">
                      <h3 class="answer_title">Телефон.рум</h3>
                      <h3 class="comment_text">{{ answer.comment }}</h3>
                    </div>
                  </div>
                </div>
                <div class="line_comment line"></div>
              </div>
            </section>
          </div>
          <div id="writeRate" class="form-review">
            <h2 class="title">{{ !dayPassed && userWritedComment && props.user ? 'Изменить отзыв' : 'Оставьте свой отзыв' }}</h2>
            <div class="form-review_wrapp">
              <div v-if="!props.user || dayPassed" class="disabled_review">
                <div class="disabled-body" style="margin: 0 auto">
                  <nuxt-img class="img-lock" :src="`img/lock.png`" loading="lazy"/>
                  <h3 class="disabled_title">{{ disabledText }}</h3>
                </div>
              </div>
              <div class="common_rating" style="padding: 1rem">
<!--                <FormCommentCreate :isDisabled="!props.user || dayPassed" @addComment="addCommentFunc" :product_id="props.product_id"/>-->
                <component
                    @addComment="addCommentFunc"
                    :product_id="props.product_id"
                    :isDisabled="!props.user || dayPassed"
                    :is="!props.user || dayPassed ? FormCommentCreate : 'div'" />
                <component
                    @updateComment="addCommentFunc"
                    :current_rating="current_rating"
                    :current_advantages="current_advantages"
                    :current_disadvantages="current_disadvantages"
                    :current_comment="current_comment"
                    :comment_id="comment_id"
                    :is="!dayPassed && userWritedComment && props.user ? FormCommentEdit : 'div'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, resolveComponent} from "vue";
import {useUserStore} from "../stores/UserStore.js";
const props = defineProps({
  rating: Object,
  product_id: Number,
  user: Object,
  comments_count: String,
  comments_count_5: String,
  comments_count_4: String,
  comments_count_3: String,
  comments_count_2: String,
  comments_count_1: String,
});
const disabledText = ref('Для написания отзыва необходимо войти');
const userWritedComment = ref(false);
const dayPassed = ref(false);

const current_rating = ref('');
const current_comment = ref('');
const current_advantages = ref('');
const current_disadvantages = ref('');
const comment_id = ref();

const FormCommentEdit = resolveComponent('FormCommentEdit');
const FormCommentCreate = resolveComponent('FormCommentCreate');


const windowWidth = ref(0);
const pending = ref(false);
const comments = ref([]);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

const config = useRuntimeConfig();
onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
  pending.value = true;
  commentsGetFormRequest().then((res) => {
    comments.value = res;
    pending.value = false;
  }).catch((err) => {
    pending.value = false;
    console.error('Contact form could not be send', err)
  });
});
const urlComments = computed(() => config.public.apiBaseUrl + 'comments/');
const addCommentFunc = () => {
  disabledText.value = 'Отзыв на данный товар успешно отправлен.';
  pending.value = true;
  commentsGetFormRequest().then((res) => {
    comments.value = res;
    pending.value = false;
  }).catch((err) => {
    pending.value = false;
    console.error('Contact form could not be send', err)
  });
}

const commentsGetFormRequest = async () => {
  return await $fetch(urlComments.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    params: {
      product_id: props.product_id,
      limit: null,
    }
  });
}
</script>

<style scoped>
.review-title{
  margin-bottom: 1.875rem;
}
.review-body{
  display: flex;
  align-content: baseline;
  margin-bottom: 3rem;
  justify-content: space-between;
}
.review_total{
  min-width: 30rem;
  height: 12.5rem;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 1.875rem 3.4375rem 4.375rem 1.875rem;
  order: 2;
}
.total_content{
  display: flex;
}
.rating_medium{
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 110%;
  display: inline-block;
  color: #1A1A25;
}
.review_left,
.review_right{
  flex: 50% 0 1;
}
.total{
  font-weight: 400;
  font-size: .875rem;
  line-height: 140%;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 3px;
  margin-left: 3px;
}
.total-rating{
  display: flex;
}
.label_star{
  display: inline-block;
  margin-left: .625rem;
}
.rating_body{
  display: inline-block;
}
.main-rating{
  margin-left: .625rem;
}
.main-rating{
  display: flex;
  align-items: center;
}
.first_review{
  font-size: 1.225rem;
  width: 90%;
  display: inline-block;
  padding-bottom: 1rem;
}
.write_review{
  width: 45%;
  align-self: center;
}
.btn_review{
  padding-top: 1.25rem;
  padding-right: 1.25rem;
}
.form-review{
  padding-top: 5rem;
}
.common_rating{
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: #1A1A25;
  margin-top: 1.875rem;
}

.form-review_section{
  margin-top: 1.875rem;
}
.review_input{
  background: #FFFFFF;
  border: 1px solid rgba(144, 156, 181, 0.3);
  border-radius: 6px;
  padding: 8px .625rem;
  margin-bottom: 1.875rem;
  transition: all .3s ease;
  width: 90%;
  height: 3rem;
}
.review_input-email,
.review_input-tel{
  display: inline-block;
  width: 40%;
}
.review_input-tel{
  margin-right: .625rem;
}
.plus_text,
.minus_text,
.message_text{
  background: #FFFFFF;
  border: 1px solid rgba(144, 156, 181, 0.3);
  border-radius: 6px;
  padding: 8px .625rem;
  margin-bottom: 1.875rem;
  width: 90%;
  transition: all .3s ease;
  min-height: 12rem;
}

textarea:hover,
.review_input:hover,
.review_input:focus-within {
  border: 1px solid #234a9d;
  transition: all .3s ease;
}
textarea:hover,
textarea:focus{
  transition: all .3s ease;
  outline-color: #234a9d;
}
.form-review_wrapp{
  position: relative;
}
.disabled_review{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0,0,0,.025);
}
.disabled_title{
  color: #BD0F2C;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  padding: .625rem;
}
.disabled-body{
  display: flex;
  position: relative;
  z-index: 99;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.title{
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  /*font-size: 2.375rem;*/
  line-height: 140%;
  color: #1A1A25;
}

.comment{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.comment-header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.rating_circle{
  width: 2.8rem;
  height: 2.8rem;
  background-color: #BD0F2C;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.375rem;
  font-weight: 500;
  border-radius: 50%;
  color: #FFFFFF;
}
.comment_info{
  padding-left: .75rem;
  display: flex;
  flex-direction: column;
}
.comment_user{
  color: #1A1A25;
  font-size: 1rem;
  font-weight: 700;
  line-height: 140%;
}
.comment_date{
  color: rgba(0, 0, 0, 0.50);
  font-size: 0.875rem;
  line-height: 130%;
}
.comment_body{
  margin-left: 3.55rem;
  margin-top: .75rem;
}
.comment_text_title{
  color: #384255;
  font-size: 1rem;
  font-weight: 700;
  line-height: 150%;
}
.text_block{
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
}
.text_block:last-child{
  padding-bottom: 0;
}
.comment_text{
  color: #384255;
  font-size: 1rem;
  line-height: 150%;
}
.comment_answer{
  background-color: #FFFFFF;
  border-radius: 0.375rem;
  display: flex;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3.55rem;
  margin-top: 1.5rem;
}
.answer_title{
  color: #BD0F2C;
  font-size: 1rem;
  font-weight: 700;
  line-height: 150%;
}
.line_comment{
  width: 100vh;
  margin: 2.25rem 0;
}
/*.line_comment:last-child{*/
/*  margin-bottom: 0;*/
/*}*/


.article {
  width: 100%;
  background: #F7F7F7;
  padding: 0;
  margin-right: 0;
}
.mask{
  background: #F7F7F7;
}
.icon-2{
  width: 24.25rem;
  height: 37.625rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem .625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}
.icon-2-2{
  width: 100%;
  height: 50vh;
  box-shadow: .3125rem 2rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem 1.625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}



@media (max-width: 768px) {
  .review_total{
    width: 100%;
    min-width: auto;
  }
  .disabled_review{
    width: max-content;
    left: 0;
  }
  .disabled_title{
    width: 99%;
  }
}
@media (max-width: 740px) {
  .review-body{
    flex-direction: column-reverse;
  }
  .disabled_review{
    width: 100%;
  }
  .review_total{
    width: 70%;
  }
  .write_review{
    width: 70%;
    padding-top: 3rem;
    align-self: flex-start;
  }
  .first_review{
    font-size: 1.25rem;
  }
  .disabled_title{
    font-size: 1.5rem;
  }
}
@media (max-width: 640px) {
  .review_total{
    width: 80%;
  }
  .write_review{
    width: 80%;
    align-self: flex-start;
  }
}
@media (max-width: 530px) {
  .review_total{
    width: 90%;
  }
  .write_review{
    width: 90%;
    align-self: flex-start;
  }
  .disabled_title{
    font-size: 1.225rem;
  }
}
@media (max-width: 460px) {
  .review_total{
    width: 100%;
  }
  .write_review{
    width: 90%;
    align-self: flex-start;
  }
}
@media (max-width: 375px) {
  .review_right{
    flex: 70% 0 1;
    margin-left: 3rem;
  }
  .review_left{
    flex: 30% 0 1;
  }
  .write_review{
    width: 100%;
  }
}
@media (max-width: 360px) {
  .review_right{
    margin-left: 2rem;
  }
}
@media (max-width: 347px) {
  .review_right{
    margin-left: 1.4rem;
  }
}
@media (max-width: 340px) {
  .total-rating{
    flex-direction: column;
  }
  .main-rating, .total{
    margin-left: 0;
  }
  .btn_review{
    padding-top: .5rem;
  }
}
</style>
