<script>
  import { onMount, onDestroy } from 'svelte';
  import { scaleLinear } from 'd3-scale';
  import { area } from 'd3-shape';
  import { axisBottom, axisLeft } from 'd3-axis';
  import { mean } from 'd3-array';
  import { select, mouse } from 'd3-selection';
  import { drag } from 'd3-drag';
  import { format } from 'd3-format';
  import 'd3-transition';

  import Title from './title.svelte';

  const clamp = (a, b, c) => {
    return Math.max(a, Math.min(b, c))
  }

  let _svg;

  let completed = false;

  const data = [{"year":1751,"total":3},
{"year":1752,"total":3},
{"year":1753,"total":3},
{"year":1754,"total":3},
{"year":1755,"total":3},
{"year":1756,"total":3},
{"year":1757,"total":3},
{"year":1758,"total":3},
{"year":1759,"total":3},
{"year":1760,"total":3},
{"year":1761,"total":3},
{"year":1762,"total":3},
{"year":1763,"total":3},
{"year":1764,"total":3},
{"year":1765,"total":3},
{"year":1766,"total":3},
{"year":1767,"total":3},
{"year":1768,"total":3},
{"year":1769,"total":3},
{"year":1770,"total":3},
{"year":1771,"total":4},
{"year":1772,"total":4},
{"year":1773,"total":4},
{"year":1774,"total":4},
{"year":1775,"total":4},
{"year":1776,"total":4},
{"year":1777,"total":4},
{"year":1778,"total":4},
{"year":1779,"total":4},
{"year":1780,"total":4},
{"year":1781,"total":5},
{"year":1782,"total":5},
{"year":1783,"total":5},
{"year":1784,"total":5},
{"year":1785,"total":5},
{"year":1786,"total":5},
{"year":1787,"total":5},
{"year":1788,"total":5},
{"year":1789,"total":5},
{"year":1790,"total":5},
{"year":1791,"total":6},
{"year":1792,"total":6},
{"year":1793,"total":6},
{"year":1794,"total":6},
{"year":1795,"total":6},
{"year":1796,"total":6},
{"year":1797,"total":7},
{"year":1798,"total":7},
{"year":1799,"total":7},
{"year":1800,"total":8},
{"year":1801,"total":8},
{"year":1802,"total":10},
{"year":1803,"total":9},
{"year":1804,"total":9},
{"year":1805,"total":9},
{"year":1806,"total":10},
{"year":1807,"total":10},
{"year":1808,"total":10},
{"year":1809,"total":10},
{"year":1810,"total":10},
{"year":1811,"total":11},
{"year":1812,"total":11},
{"year":1813,"total":11},
{"year":1814,"total":11},
{"year":1815,"total":12},
{"year":1816,"total":13},
{"year":1817,"total":14},
{"year":1818,"total":14},
{"year":1819,"total":14},
{"year":1820,"total":14},
{"year":1821,"total":14},
{"year":1822,"total":15},
{"year":1823,"total":16},
{"year":1824,"total":16},
{"year":1825,"total":17},
{"year":1826,"total":17},
{"year":1827,"total":18},
{"year":1828,"total":18},
{"year":1829,"total":18},
{"year":1830,"total":24},
{"year":1831,"total":23},
{"year":1832,"total":23},
{"year":1833,"total":24},
{"year":1834,"total":24},
{"year":1835,"total":25},
{"year":1836,"total":29},
{"year":1837,"total":29},
{"year":1838,"total":30},
{"year":1839,"total":31},
{"year":1840,"total":33},
{"year":1841,"total":34},
{"year":1842,"total":36},
{"year":1843,"total":37},
{"year":1844,"total":39},
{"year":1845,"total":43},
{"year":1846,"total":43},
{"year":1847,"total":46},
{"year":1848,"total":47},
{"year":1849,"total":50},
{"year":1850,"total":54},
{"year":1851,"total":54},
{"year":1852,"total":57},
{"year":1853,"total":59},
{"year":1854,"total":69},
{"year":1855,"total":71},
{"year":1856,"total":76},
{"year":1857,"total":77},
{"year":1858,"total":78},
{"year":1859,"total":83},
{"year":1860,"total":91},
{"year":1861,"total":95},
{"year":1862,"total":97},
{"year":1863,"total":104},
{"year":1864,"total":112},
{"year":1865,"total":119},
{"year":1866,"total":122},
{"year":1867,"total":130},
{"year":1868,"total":135},
{"year":1869,"total":142},
{"year":1870,"total":147},
{"year":1871,"total":156},
{"year":1872,"total":173},
{"year":1873,"total":184},
{"year":1874,"total":174},
{"year":1875,"total":188},
{"year":1876,"total":191},
{"year":1877,"total":194},
{"year":1878,"total":196},
{"year":1879,"total":210},
{"year":1880,"total":236},
{"year":1881,"total":243},
{"year":1882,"total":256},
{"year":1883,"total":272},
{"year":1884,"total":275},
{"year":1885,"total":277},
{"year":1886,"total":281},
{"year":1887,"total":295},
{"year":1888,"total":327},
{"year":1889,"total":327},
{"year":1890,"total":356},
{"year":1891,"total":372},
{"year":1892,"total":374},
{"year":1893,"total":370},
{"year":1894,"total":383},
{"year":1895,"total":406},
{"year":1896,"total":419},
{"year":1897,"total":440},
{"year":1898,"total":465},
{"year":1899,"total":507},
{"year":1900,"total":534},
{"year":1901,"total":552},
{"year":1902,"total":566},
{"year":1903,"total":617},
{"year":1904,"total":624},
{"year":1905,"total":663},
{"year":1906,"total":707},
{"year":1907,"total":784},
{"year":1908,"total":750},
{"year":1909,"total":785},
{"year":1910,"total":819},
{"year":1911,"total":836},
{"year":1912,"total":879},
{"year":1913,"total":943},
{"year":1914,"total":850},
{"year":1915,"total":838},
{"year":1916,"total":901},
{"year":1917,"total":955},
{"year":1918,"total":936},
{"year":1919,"total":806},
{"year":1920,"total":932},
{"year":1921,"total":803},
{"year":1922,"total":845},
{"year":1923,"total":970},
{"year":1924,"total":963},
{"year":1925,"total":975},
{"year":1926,"total":983},
{"year":1927,"total":1062},
{"year":1928,"total":1065},
{"year":1929,"total":1145},
{"year":1930,"total":1053},
{"year":1931,"total":940},
{"year":1932,"total":847},
{"year":1933,"total":893},
{"year":1934,"total":973},
{"year":1935,"total":1027},
{"year":1936,"total":1130},
{"year":1937,"total":1209},
{"year":1938,"total":1142},
{"year":1939,"total":1192},
{"year":1940,"total":1299},
{"year":1941,"total":1334},
{"year":1942,"total":1342},
{"year":1943,"total":1391},
{"year":1944,"total":1383},
{"year":1945,"total":1160},
{"year":1946,"total":1238},
{"year":1947,"total":1392},
{"year":1948,"total":1469},
{"year":1949,"total":1419},
{"year":1950,"total":1630},
{"year":1951,"total":1767},
{"year":1952,"total":1795},
{"year":1953,"total":1841},
{"year":1954,"total":1865},
{"year":1955,"total":2042},
{"year":1956,"total":2177},
{"year":1957,"total":2270},
{"year":1958,"total":2330},
{"year":1959,"total":2454},
{"year":1960,"total":2569},
{"year":1961,"total":2580},
{"year":1962,"total":2686},
{"year":1963,"total":2833},
{"year":1964,"total":2995},
{"year":1965,"total":3130},
{"year":1966,"total":3288},
{"year":1967,"total":3393},
{"year":1968,"total":3566},
{"year":1969,"total":3780},
{"year":1970,"total":4053},
{"year":1971,"total":4208},
{"year":1972,"total":4376},
{"year":1973,"total":4614},
{"year":1974,"total":4623},
{"year":1975,"total":4596},
{"year":1976,"total":4864},
{"year":1977,"total":5016},
{"year":1978,"total":5074},
{"year":1979,"total":5357},
{"year":1980,"total":5301},
{"year":1981,"total":5138},
{"year":1982,"total":5094},
{"year":1983,"total":5075},
{"year":1984,"total":5258},
{"year":1985,"total":5417},
{"year":1986,"total":5583},
{"year":1987,"total":5725},
{"year":1988,"total":5936},
{"year":1989,"total":6066},
{"year":1990,"total":6074},
{"year":1991,"total":6142},
{"year":1992,"total":6078},
{"year":1993,"total":6070},
{"year":1994,"total":6174},
{"year":1995,"total":6305},
{"year":1996,"total":6448},
{"year":1997,"total":6556},
{"year":1998,"total":6576},
{"year":1999,"total":6561},
{"year":2000,"total":6733},
{"year":2001,"total":6893},
{"year":2002,"total":6994},
{"year":2003,"total":7376},
{"year":2004,"total":7743},
{"year":2005,"total":8042},
{"year":2006,"total":8336},
{"year":2007,"total":8503},
{"year":2008,"total":8776},
{"year":2009,"total":8697},
{"year":2010,"total":9128},
{"year":2011,"total":9503},
{"year":2012,"total":9673},
{"year":2013,"total":9773},
{"year":2014,"total":9855}]

  const height = 400;
  const width = 700;

  const startYear = 1950;
  const cutoffYear = 1970;
  const endYear = 2014;

	onMount(() => {

    const svg = select(_svg);

    svg.append('rect').attr('width', width).attr('height', height).attr('opacity', 0);

    const x = scaleLinear().domain([startYear, endYear]).range([0, width])
    const y = scaleLinear().domain([0, 10000]).range([height, 0])

    // const Area = area().x(d => x(d.year)).y1(d => y(d.total)).y0(y(0));
    const line = area().x(d => x(d.year)).y(d => y(d.total));

    const xAxis = axisBottom().scale(x);
    const yAxis = axisLeft().scale(y);

    //Append group and insert axis
    const xAxisG = svg.append("g").attr('class', 'x axis').attr("transform", "translate(0," + height + ")");
    const yAxisG = svg.append("g").attr('class', 'y axis');

    xAxisG.call(xAxis.ticks(5).tickFormat(format("d")));
    yAxisG.call(yAxis);

    const clipRect = svg.append('clipPath').attr('id', 'clip').append('rect')
      .attr('width', x(cutoffYear) - 2)
      .attr('height', height);

    console.log(clipRect)

    const correctSel =  svg.append('g').attr('clip-path', 'url(#clip)')

    // correctSel.append('path').attr('class', 'area').attr('d', Area(data));
    correctSel.append('path').attr('class', 'line').attr('d', line(data));
    const yourDataSel = svg.append('path').attr('class', 'your-line');

    const yourData = data
      .map((d) => {
        return { year: d.year, total: d.total, defined: 0 }
      })
      .filter((d) => {
        if (d.year == cutoffYear) d.defined = true
        return d.year >= cutoffYear;
      })

    var Drag = drag()
      .on('drag', function() {
        const pos = mouse(this)
        const year = clamp(cutoffYear+1, endYear, x.invert(pos[0]))
        const total = clamp(0, y.domain()[1], y.invert(pos[1]))

        yourData.forEach((d) => {
          if (Math.abs(d.year - year) < .5){
            d.total = total
            d.defined = true
          }
        })

        yourDataSel.attr('d', line.defined(d => d.defined)(yourData) )

        if (!completed && mean(yourData, d => d.defined) == 1){
          console.log('we here')
          completed = true
          clipRect.transition().duration(1000).attr('width', x(endYear))
        }
      })

    svg.call(Drag)


  });
</script>

<style>

  svg {
    display: block;
    margin: 0 auto 1em auto;
    overflow: visible;
    max-width: 90%;
  }

  svg :global(.axis) {
    opacity: .5;
  }

  svg :global(.line) {
    fill: none;
    stroke: black;
    stroke-width: 3;
  }

  svg :global(.area) {
    fill: #eee;
  }

  svg :global(.your-line) {
    stroke: var(--orange);
    stroke-width: 3;
    stroke-dasharray: 5 5;
  }

  svg :global(.x.axis text) {
    font-size: 2em;
  }

  .caption-text {
    margin: 2em auto 0 auto;
    max-width: 300px;
    font-size: 0.9em;
    text-align: center;
  }
</style>

<div class="interactive-container">

  <Title
    titleText="Complete the trend of CO2 emissions from burning fossil fuels."
    subtitleText="Letting a reader first guess about data and only showing the ground truth afterwards challenges a reader's prior beliefs and has been shown to improve their recall of information."
  />

  <svg
    bind:this={_svg}
    viewBox={`0 0 ${width} ${height}`}
  ></svg>

  <div class="caption-text">
    {#if completed}
      <div>How did you do?</div>
    {:else}
      <div>Fill in the trend to see the actual data. Measured in metric tons of CO2.</div>
    {/if}
  </div>


</div>
