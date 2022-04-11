var bezier_points = [];
var time = 0;

function my_lerp(x1, x2, t) {
	return (1 - t) * x1 + t * x2;
}

function lerpPoints(p1, p2, t) {
	var x = my_lerp(p1.x, p2.x, t);
	var y = my_lerp(p1.y, p2.y, t);
	return createVector(x, y);
}

function qBezierCurve(p0, p1, p2) {
	noFill();
	stroke(255);
	strokeWeight(2);
	beginShape();
	for (var i = 0; i < 1; i += 0.005) {
		var p3 = lerpPoints(p0, p1, i);
		var p4 = lerpPoints(p1, p2, i);
		var p = lerpPoints(p3, p4, i);
		vertex(p.x, p.y);
	}
	endShape();
}

function cBezierCurve(p0, p1, p2, p3) {
	noFill();
	stroke(255);
	strokeWeight(1);
	beginShape();
	for (var i = 0; i < 1.01; i += 0.01) {
		var p4 = lerpPoints(p0, p1, i);
		var p5 = lerpPoints(p1, p2, i);
		var p6 = lerpPoints(p2, p3, i);
		var p7 = lerpPoints(p4, p5, i);
		var p8 = lerpPoints(p5, p6, i);

		var p = lerpPoints(p7, p8, i);
		vertex(p.x, p.y);
	}
	endShape();
}

function xBezierCurve(points) {
	if (points.length == 0) {
		return;
	}
	var copy_points;
	noFill();
	stroke(255);
	strokeWeight(1);
	beginShape();
	for (var t = 0; t < 1.001; t += 0.001) {
		copy_points = [...points];
		while (copy_points.length > 1) {
			for (var i = 0; i < copy_points.length - 1; i++) {
				copy_points[i] = lerpPoints(copy_points[i], copy_points[i + 1], t);
			}
			copy_points.pop();
		}
		vertex(copy_points[0].x, copy_points[0].y);
	}
	endShape();
}

function bezier_Point(points, t) {
	if (points.length == 0) {
		return;
	}
	var copy_points = [...points];
	while (copy_points.length > 1) {
		for (var i = 0; i < copy_points.length - 1; i++) {
			copy_points[i] = lerpPoints(copy_points[i], copy_points[i + 1], t);
		}
		copy_points.pop();
	}
	ellipse(copy_points[0].x, copy_points[0].y, 7);
}

function setup() {
	createCanvas(600, 600);
	background(75);
}

function draw() {
	background(75);
	fill(255);
	noStroke();
	bezier_points.forEach(element => ellipse(element.x, element.y, 7));
	xBezierCurve(bezier_points);
	noStroke();
	fill(255, 255 * (1 - time % 1), 255 * (1 - time % 1));
	bezier_Point(bezier_points, time % 1);
	time += 0.01;
}

function mousePressed() {
	bezier_points.push(createVector(mouseX, mouseY));
}