// Grab X
const GRAB_X_1 = 8000;
const GRAB_X_2 = 7500;
const GRAB_X_3 = 7000;
const GRAB_X_WAIT = 2000;

// Grab X
const GRAB_SUV_1 = 9000;
const GRAB_SUV_2 = 8500;
const GRAB_SUV_3 = 8000;
const GRAB_SUV_WAIT = 3000;

// Grab X
const GRAB_BLACK_1 = 10000;
const GRAB_BLACK_2 = 9500;
const GRAB_BLACK_3 = 9000;
const GRAB_BLACK_WAIT = 3500;

var distanceFee_1 = 0;
var distanceFee_2 = 0;
var distanceFee_3 = 0;
var waitFee = 0;
var waitFeeType = 0;
var totalFee = 0;
var unitPrice = 0;

var currentFormat = new Intl.NumberFormat("vn-VN");
document.getElementById("btnBill").disabled = true;
document.getElementById("btnFeeCalc").onclick = function () {
	var distance = document.getElementById("distance").value;
	var waitTime = document.getElementById("waitTime").value;
	var carType = getCarType();

	switch (carType) {
		case "grabX":
			unitPrice = getUnitPrice(distance, GRAB_X_1, GRAB_X_2, GRAB_X_3);
			waitFeeType = GRAB_X_WAIT;
			waitFee = waitFeeCalc(waitTime, GRAB_X_WAIT);
			totalFee = distanceFeeCalc(
				distance,
				waitFee,
				GRAB_X_1,
				GRAB_X_2,
				GRAB_X_3
			);
			break;

		case "grabSUV":
			unitPrice = getUnitPrice(distance, GRAB_SUV_1, GRAB_SUV_2, GRAB_SUV_3);
			waitFeeType = GRAB_SUV_WAIT;
			waitFee = waitFeeCalc(waitTime, GRAB_SUV_WAIT);
			totalFee = distanceFeeCalc(
				distance,
				waitFee,
				GRAB_SUV_1,
				GRAB_SUV_2,
				GRAB_SUV_3
			);
			break;

		case "grabBlack":
			unitPrice = getUnitPrice(
				distance,
				GRAB_BLACK_1,
				GRAB_BLACK_2,
				GRAB_BLACK_3
			);
			waitFeeType = GRAB_BLACK_WAIT;
			waitFee = waitFeeCalc(waitTime, GRAB_BLACK_WAIT);
			totalFee = distanceFeeCalc(
				distance,
				waitFee,
				GRAB_BLACK_1,
				GRAB_BLACK_2,
				GRAB_BLACK_3
			);
			break;

		default:
			alert("VUI LONG CHON LOAI XE");
			break;
	}

	// In kết quả
	printResults(totalFee);
	document.getElementById("divThanhTien").style.display = "block";
	document.getElementById("btnBill").disabled = false;
};

function getCarType() {
	var grabX = document.getElementById("grabX");
	var grabSUV = document.getElementById("grabSUV");
	var grabBlack = document.getElementById("grabBlack");
	var carType = "";

	if (grabX.checked) {
		carType = "grabX";
	} else if (grabSUV.checked) {
		carType = "grabSUV";
	} else if (grabBlack.checked) {
		carType = "grabBlack";
	}

	return carType;
}

function waitFeeCalc(waitTime, waitFeeType) {
	var result = 0;
	if (waitTime >= 3) {
		result = Math.floor(waitTime / 3) * waitFeeType;
	}

	return result;
}

function distanceFeeCalc(distance, waitFee, fee_1, fee_2, fee_3) {
	var fTotal = 0;
	var df_1 = 0;
	var df_2 = 0;
	var df_3 = 0;

	if (0 <= distance && distance <= 1) {
		df_1 = distance * fee_1;
		fTotal = df_1 + waitFee;
	} //
	else if (1 < distance && distance <= 19) {
		df_1 = fee_1;
		df_2 = df_1 + (distance - 1) * fee_2;
		fTotal = df_2 + waitFee;
	} //
	else if (distance > 19) {
		df_1 = fee_1;
		df_2 = df_1 + 18 * fee_2;
		df_3 = df_2 + (distance - 19) * fee_3;
		fTotal = df_3 + waitFee;
	}

	return fTotal;
}

function printResults(totalFee) {
	var result;
	result = currentFormat.format(totalFee);
	document.getElementById("xuatTien").innerHTML = result;

	return result;
}

function getUnitPrice(distance, fee_1, fee_2, fee_3) {
	var unitPrice = 0;

	if (0 <= distance && distance <= 1) {
		unitPrice = fee_1;
	}
	if (1 < distance && distance <= 19) {
		unitPrice = fee_2;
	}
	if (distance > 19) {
		unitPrice = fee_3;
	}
	return unitPrice;
}

// In hoá đơn

document.getElementById("btnBill").onclick = function () {
	var content = "";
	var distance = document.getElementById("distance").value;
	var waitTime = document.getElementById("waitTime").value;

	if (0 <= distance && distance <= 1) {
		content += "<tr>";
		content += "   <td>Km dau tien</td>";
		content += "   <td> " + distance + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "   <td> " + Math.floor(totalFee - waitFee) + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>Thoi gian cho</td>";
		content += "   <td> " + waitTime + "</td>";
		content += "   <td> " + waitFeeType + "</td>";
		content += "   <td> " + waitFee + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>TONG TIEN: " + totalFee + "</td>";
		content += "</tr>";
	}

	if (1 < distance && distance <= 19) {
		content += "<tr>";
		content += "   <td>Km dau tien</td>";
		content += "   <td> " + 1 + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>Tu 1 toi " + distance + "</td>";
		content += "   <td> " + (distance - 1) + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "   <td> " + (totalFee - waitFee - unitPrice) + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>Thoi gian cho</td>";
		content += "   <td> " + waitTime + "</td>";
		content += "   <td> " + waitFeeType + "</td>";
		content += "   <td> " + waitFee + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>TONG TIEN: " + totalFee + "</td>";
		content += "</tr>";
	}

	if (distance > 19) {
		content += "<tr>";
		content += "   <td>Km dau tien</td>";
		content += "   <td> " + 1 + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>Tu 1 toi 19</td>";
		content += "   <td> " + 18 + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "   <td> " + unitPrice * 18 + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>Tu 20 toi " + distance + "</td>";
		content += "   <td> " + (distance - 19) + "</td>";
		content += "   <td> " + unitPrice + "</td>";
		content += "   <td> " + (totalFee - waitFee - unitPrice * 19) + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>Thoi gian cho</td>";
		content += "   <td> " + waitTime + "</td>";
		content += "   <td> " + waitFeeType + "</td>";
		content += "   <td> " + waitFee + "</td>";
		content += "</tr>";

		content += "<tr>";
		content += "   <td>TONG TIEN: " + totalFee + "</td>";
		content += "</tr>";
	}

	document.getElementById("tableBody").innerHTML = content;
};
