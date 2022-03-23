import styled from 'styled-components';

/* background: #2980b9;  /* fallback for old browsers 
background: -webkit-linear-gradient(to right, #2c3e50, #2980b9);   Chrome 10-25, Safari 5.1-6 
background: linear-gradient(to right, #2c3e50, #2980b9);  W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ 
 */

// background: #1e3c72;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #2a5298, #1e3c72);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #2a5298, #1e3c72); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

// background: #457fca;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #5691c8, #457fca);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #5691c8, #457fca); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

// background: #0f0c29;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

// background: #D3CCE3;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

// background: #141E30;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

// background: #4b6cb7;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #182848, #4b6cb7);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #182848, #4b6cb7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

interface Gradient {
	name: string;
	fallback: string;
	gradient: string;
}

const gradients: Gradient[] = [
	{
		name: 'nighthawk',
		fallback: '#2980b9',
		gradient: 'to top, #2c3e50, #2980b9',
	},
	{
		name: 'joomla',
		fallback: '#1e3c72',
		gradient: 'to bottom, #2a5298, #1e3c72',
	},
	{
		name: 'inbox',
		fallback: '#457fca',
		gradient: 'to bottom, #5691c8, #457fca',
	},
	{
		name: 'lawrencium',
		fallback: '#0f0c29',
		gradient: 'to right, #24243e, #302b63, #0f0c29',
	},
	{
		name: 'delicate',
		fallback: '#D3CCE3',
		gradient: 'to bottom, #E9E4F0, #D3CCE3',
	},
	{
		name: 'royal',
		fallback: '#141E30',
		gradient: 'to top, #141E30, #243B55, #141E30',
	},
	{
		name: 'pinot noir',
		fallback: '#4b6cb7',
		gradient: 'to top, #182848, #4b6cb7',
	},
	{
		name: 'blue',
		fallback: 'rgb(9, 30, 59)',
		gradient:
			'to top, rgba(9, 30, 59, 1) -20%, rgba(46, 101, 177, 1) 20%, rgba(188, 211, 242, 1) 100%',
	},
];

const index: number = 7;

export const SiteContainer = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;
	background: ${gradients[index].fallback};
	background: linear-gradient(${gradients[index].gradient});
	background: -webkit-linear-gradient(${gradients[index].gradient});
`;
