CREATE TABLE Artist (
    artist_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY(artist_id)
    ) ENGINE = INNODB;

CREATE TABLE Album (
    album_id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    artist_id INTEGER,
    PRIMARY KEY(album_id),
    INDEX USING BTREE (title),
    
    CONSTRAINT FOREIGN KEY (artist_id)
        REFERENCES Artist (artist_id)
        ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = INNODB;
    
CREATE TABLE Genre (
    genre_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY(genre_id),
    INDEX USING BTREE(name)
    ) ENGINE = INNODB;
    
CREATE TABLE Track (
    track_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    len INTEGER,
    rating INTEGER,
    count INTEGER,
    album_id INTEGER,
    genre_id INTEGER,
    
    CONSTRAINT FOREIGN KEY (album_id)
        REFERENCES Artist (album_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    
    CONSTRAINT FOREIGN KEY (genre_id)
        REFERENCES Artist (genre_id)
        ON DELETE CASCADE ON UPDATE CASCADE
    
) ENGINE = INNODB;    
    

SELECT
    Track.title,
    Artist.name,
    Album.title,
    Genre.name
    FROM Track JOIN Genre Join Album JOIN Artist on Track.genre_id = Genre.genre_id 
    and Track.album_id and Album.artist_id = Artist.artist_id


SELECT Track.title, Artist.name, Album.title, Genre.name FROM Track
    JOIN Genre     
    JOIN Album
    JOIN Artist on
        Track.genre_id = Genre.genre_id and
        Track.album_id = Album.album_id and
        Album.artist_id = Artist.artist_id
    ORDER BY Track.track_id


SELECT DISTINCT  Artist.name, Genre.name
    FROM Track
        JOIN Album
        JOIN Genre
        JOIN Artist
            ON
                Track.album_id = Album.album_id AND
                Track.genre_id = Genre.genre_id AND
                Artist.artist_id = Album.artist_id
        WHERE Artist.name = 'juice WRLD'