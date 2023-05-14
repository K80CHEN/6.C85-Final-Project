<script>
  import P5 from "p5-svelte";

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const getColor = () => {
    let a = ["#94855f", "#ccb58a", "#76958d", "#707070", "#69a0a4"];
    return a[getRandomInt(a.length)];
  };

  const create_square = (x, y, wh) => {
    return { x: x, y: y, wh: wh, rate: 0.5 * Math.random(), clr: getColor() };
  };

  let started = false;

  const width = 1500;
  const height = 400;
  const nf = 0.005;
  const wave = 0;
  const speed = 0.5;

  const bg = "#ffffff";
  let sq = [];
  const remove = [];
  let removed = 0;
  const n = 1000;
  const diff = width / n / width;

  for (let j = 0; j < n; j++) {
    sq.push(
      create_square(
        width * diff * j,
        height * 0.1 + Math.random() * 0.8 * height,
        10
      )
    );
    remove.push(true);
  }

  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(width, height);
      p5.background(bg);
      p5.noStroke();
    };

    p5.draw = () => {
      p5.background(bg);
      for (let i = 0; i < sq.length; i++) {
        if (remove[i]) {
          p5.fill("#ccb58a");
        } else {
          p5.fill("#800020");
        }
        p5.push();
        p5.translate(sq[i].x, sq[i].y);
        const nfx = p5.noise(sq[i].x * nf, sq[i].y * nf);
        p5.rotate(p5.TWO_PI * nfx);
        p5.rect(nfx * wave, 0, sq[i].wh, sq[i].wh);
        if (started && removed < n / 2 && Math.random() < 0.001) {
          removed += 1;
          remove[i] = false;
        }
        if (started && remove[i]) {
          sq[i].x += speed + p5.sin(p5.frameCount * sq[i].rate) * 0.01;
          sq[i].y += p5.cos(p5.frameCount * sq[i].rate) * 0.01;
          if (sq[i].x > width || sq[i].x < 0) {
            sq[i].x = 0;
          }
        } else if (started && sq[i].y <= height - 3) {
          sq[i].y += 0.5;
        }
        p5.pop();
        p5.fill(255);
      }
    };
  };
</script>

<button
  class="btn"
  on:click={() => {
    started = !started;
  }}
>
  {#if started}
    Pause Animation
  {:else}
    Start Animation
  {/if}
</button>
<P5 {sketch} />

<style>
  .btn {
    display: inline-block;
    width: 200px;
    padding: 10px 15px;
    background-color: #fff;
    padding: 10px 15px;
    border: 1px solid #053e69;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.35s ease-out;
    transition-property: background-color;
    font-family: "libre franklin";
    font-size: 0.8rem;
    transition: background-color 0.3s ease;
  }
  .btn:hover {
    background-color: #707070;
  }
</style>
