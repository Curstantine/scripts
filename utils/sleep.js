var sleepSetTimeout_ctrl;

export default function sleep(ms) {
	clearInterval(sleepSetTimeout_ctrl);
	return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}
