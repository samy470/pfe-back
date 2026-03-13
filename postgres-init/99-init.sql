SELECT pg_sleep(5);

CREATE TABLE IF NOT EXISTS public.games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    heroimage TEXT NOT NULL,
    price VARCHAR(50) NOT NULL,
    discount INTEGER,
    rating DECIMAL(2,1) NOT NULL,
    reviews INTEGER NOT NULL,
    platforms TEXT[] NOT NULL,
    trending BOOLEAN NOT NULL,
    details TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    size VARCHAR(50) NOT NULL,
    requirements TEXT NOT NULL
);

INSERT INTO public.games ("name",publisher,image,heroimage,price,discount,rating,reviews,platforms,trending,details,category,"size",requirements) VALUES
	 ('God of War','PlayStation PC LLC','https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_hero.jpg','6000 DA',40,4.8,85420,'{windows}',true,'His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters.','Action','70 GB','GPU: GTX 1060 | CPU: i5-6600k | RAM: 8GB'),
	 ('Elden Ring','FromSoftware Inc.','https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg','10000 DA',0,4.9,120500,'{windows}',true,'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.','RPG','60 GB','GPU: GTX 1060 | CPU: i5-8400 | RAM: 12GB'),
	 ('Red Dead Redemption 2','Rockstar Games','https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg','8000 DA',67,4.9,450000,'{windows}',false,'America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters hounding them.','Adventure','150 GB','GPU: GTX 1060 | CPU: i7-4770K | RAM: 12GB'),
	 ('The Last of Us Part I','PlayStation PC LLC','https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_hero.jpg','9000 DA',20,4.7,25000,'{windows}',true,'Experience the emotional storytelling and unforgettable characters in The Last of Us, winner of over 200 Game of the Year awards.','Action','75 GB','GPU: RTX 3060 | CPU: i7-9700K | RAM: 16GB'),
	 ('Cyberpunk 2077','CD PROJEKT RED','https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg','7000 DA',50,4.5,650000,'{windows}',true,'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City.','RPG','70 GB','GPU: RTX 2060 | CPU: i7-6700 | RAM: 12GB'),
	 ('The Witcher 3: Wild Hunt','CD PROJEKT RED','https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_hero.jpg','5000 DA',75,4.9,700000,'{windows}',false,'The most awarded game of a generation! Become a professional monster slayer.','RPG','50 GB','GPU: GTX 770 | CPU: i7-3770 | RAM: 8GB'),
	 ('Horizon Zero Dawn','PlayStation PC LLC','https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_hero.jpg','6500 DA',33,4.6,120000,'{windows}',false,'Experience Aloy''s entire legendary quest to unravel the mysteries of a world ruled by deadly Machines.','Action','100 GB','GPU: GTX 1060 | CPU: i7-4770 | RAM: 16GB'),
	 ('Sekiro: Shadows Die Twice','Activision','https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_hero.jpg','7500 DA',0,4.8,180000,'{windows}',true,'Carve your own clever path to vengeance in the award-winning adventure.','Action','25 GB','GPU: GTX 970 | CPU: i5-2500K | RAM: 8GB'),
	 ('Civilization VI','2K Games','https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_hero.jpg','4500 DA',90,4.4,200000,'{windows,mac}',false,'Civilization VI offers new ways to interact with your world, expand your empire.','Strategy','12 GB','GPU: GTX 770 | CPU: i5-4460 | RAM: 8GB'),
	 ('FIFA 23','Electronic Arts','https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/library_hero.jpg','9500 DA',25,3.8,150000,'{windows}',true,'Experience the pinnacle of international football.','Sports','100 GB','GPU: GTX 1050 Ti | CPU: i5-6600K | RAM: 8GB');
INSERT INTO public.games ("name",publisher,image,heroimage,price,discount,rating,reviews,platforms,trending,details,category,"size",requirements) VALUES
	 ('Forza Horizon 5','Xbox Game Studios','https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_hero.jpg','7000 DA',45,4.7,140000,'{windows}',true,'Your ultimate Horizon Adventure awaits! Explore Mexico.','Sports','110 GB','GPU: GTX 1070 | CPU: i5-8400 | RAM: 8GB'),
	 ('Anno 1800','Ubisoft','https://cdn.cloudflare.steamstatic.com/steam/apps/916440/library_600x900_2x.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/916440/library_hero.jpg','8500 DA',15,4.6,80000,'{windows}',false,'Welcome to the dawn of the Industrial Age.','Strategy','60 GB','GPU: GTX 970 | CPU: i5-4460 | RAM: 8GB');
