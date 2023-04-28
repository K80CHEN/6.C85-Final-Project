import { onMount } from 'svelte';
import * as d3 from 'd3';

export function useD3(create, update) {
  return function (node) {
    create(node);

    onMount(() => {
      update(node);
      return () => {
        update(node);
      };
    });
  };
}
