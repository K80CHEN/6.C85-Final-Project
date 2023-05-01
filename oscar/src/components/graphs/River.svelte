<script>
    import P5 from 'p5-svelte';

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    const getColor = () => {
        let a = ["#94855f", "#ccb58a", "#76958d", "#707070", "#69a0a4"];
        return a[getRandomInt(a.length)];
    }

    const create_square = (x, y, wh) => {
        return { x: x, y: y, wh: wh, rate: 0.5*Math.random(), clr: getColor() };
    }

    const width = 1500;
    const height = 400;
    const nf = 0.005;
    const wave = 20;
    const speed = 1;

    const bg = "#ffffff";
    let sq = [];
    let remove = [];
    const n = 500;
    const diff = width / n / width;

    for (let j = 0; j < n; j++) {
        sq.push(create_square(width * diff * j,
                              height * 0.1 + Math.random() * 0.8 * height, 20));
    }

    const sketch = (p5) => {
      p5.setup = () => {
        p5.createCanvas(width, height);
        p5.background(bg);
        p5.noStroke();
      };
  
      p5.draw = () => {
        p5.background(bg);
        for (let i=0; i < sq.length; i++) {
            p5.fill(sq[i].clr);
            p5.push();
            p5.translate(sq[i].x, sq[i].y);
            const nfx = p5.noise(sq[i].x * nf, sq[i].y * nf);
            p5.rotate(p5.TWO_PI * nfx);
            p5.rect(nfx * wave, 0, sq[i].wh, sq[i].wh);

            p5.pop();
            p5.fill(255);
            sq[i].x += speed + p5.sin(p5.frameCount * sq[i].rate);
            sq[i].y += p5.cos(p5.frameCount * sq[i].rate);
            if (sq[i].x > width || sq[i].x < 0) {
                sq[i].x = 0;
            }
            if (sq.length > n/2) {
                if (Math.random() < 0.001) { remove.push(false); }
                else { remove.push(true); }
            }
        }
        if (sq.length > n/2) {
            sq = sq.filter((value, index) => { return remove[index]; })
            remove = [];
        }
      };
    };
</script>

<P5 {sketch} />
  