create table PERFORMANCE (
	id int identity not null primary key,
    created datetime default CURRENT_TIMESTAMP,
    device VARCHAR(20),
	plataforma VARCHAR(20),
	locale VARCHAR(10),
	first_render_time int,
	total_load_time int,
	total_size int,
	load_without_js int,
	request int,
	score VARCHAR(20)
);


