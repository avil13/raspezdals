<template>
    <div class="list-animated">
        <transition-group name="list">
            <slot />
        </transition-group>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class ListComponent extends Vue {
    //
}
</script>

<style>
.list-animated {
  position: relative;

}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 250ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
  /* transition-delay: 100ms; */
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
