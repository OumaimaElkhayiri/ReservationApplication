-- Create database and switch to it
CREATE TABLE IF NOT EXISTS Salons (
    idSalon INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    adresseCourriel TEXT NOT NULL,
    adresse TEXT NOT NULL,
    descriptionSalon TEXT NOT NULL,
    idTypeCoiffure INTEGER NOT NULL,
    FOREIGN KEY (idTypeCoiffure) REFERENCES TypeCoiffure(idTypeCoiffure)

    
);

CREATE TABLE IF NOT EXISTS Coiffeurs (
    idCoiffeur INTEGER PRIMARY KEY AUTOINCREMENT,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    username TEXT NOT NULL,
    numTelephone TEXT NOT NULL,
    motDePasse TEXT NOT NULL,
    idSalon INTEGER NOT NULL,
    Disponibilite TEXT NOT NULL,
    imageURL TEXT NOT NULL,
    FOREIGN KEY (idSalon) REFERENCES Salons(idSalon)

);

CREATE TABLE IF NOT EXISTS Avis (
    idAvis INTEGER PRIMARY KEY AUTOINCREMENT,
    idClient INTEGER NOT NULL,
    idCoiffeur INTEGER NOT NULL,
    note REAL NOT NULL,
    review TEXT NOT NULL,
    FOREIGN KEY (idClient) REFERENCES Clients(idClient),
    FOREIGN KEY (idCoiffeur) REFERENCES Coiffeurs(idCoiffeur)
);


CREATE TABLE IF NOT EXISTS Clients (
    idClient INTEGER PRIMARY KEY AUTOINCREMENT,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    username TEXT NOT NULL,
    numTelephone TEXT NOT NULL,
    motDePasse password NOT NULL
);


CREATE TABLE IF NOT EXISTS TypeCoiffure (
    idTypeCoiffure INTEGER PRIMARY KEY AUTOINCREMENT,
    nomCoiffure TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS Reservations (
    idReservation INTEGER PRIMARY KEY AUTOINCREMENT,
    datereservation date NOT NULL,
    Heure varchar NOT NULL,
    idCoiffeur INTEGER NOT NULL,
    idClient INTEGER NOT NULL,
    idTypeCoiffure INTEGER NOT NULL,
    FOREIGN KEY (idClient) REFERENCES Clients(idClient),
    FOREIGN KEY (idCoiffeur) REFERENCES Coiffeurs(idCoiffeur),
    FOREIGN KEY (idTypeCoiffure) REFERENCES TypeCoiffure(idTypeCoiffure)

);


CREATE TABLE IF NOT EXISTS Transactions (
    idTransaction INTEGER PRIMARY KEY AUTOINCREMENT,
    datetransaction date NOT NULL,
    prix INTEGER NOT NULL,
    idTypeCoiffure INTEGER NOT NULL,
    idClient INTEGER NOT NULL,
    FOREIGN KEY (idTypeCoiffure) REFERENCES TypeCoiffure(idTypeCoiffure),
    FOREIGN KEY (idClient) REFERENCES Clients(idClient)
)


INSERT INTO Transactions(datetransaction,prix,idTypeCoiffure,idClient)
     VALUES ('2024-03-29', 20, 1, 4),
           ('2024-05-20', 25, 2, 2),
           ('2024-02-15', 15, 4, 5),
           ('2024-04-05', 50, 6 ,6);




-- Insert data
INSERT INTO Clients (prenom, nom, username, numTelephone, motDePasse)
    VALUES ('David', 'Chiu', 'Dave', '5147654321', 'MeIsGood420'),
           ('Oumaima', 'El Khayiri', 'Harin', '5143121746', 'bruh'),
           ('Capucine', 'Dubois', 'Holiangie', '5141234567', 'MeIsLate420'),
           ('Alvaro', 'Rodriguez', 'EdwardoMucho', '5147463121', 'MeIsNotGood420');

INSERT INTO Coiffeurs (prenom, nom, username, numTelephone, motDePasse,idSalon,Disponibilite, imageURL)
    VALUES ('Ariana', 'Grande', 'AriGrande', '4381234567', 'ThankYouNext', 1,"10:00-18:00","https://www.billboard.com/wp-content/uploads/2022/08/Ariana-Grande-the-voice-2021-billboard-1548.jpg?w=875&h=583&crop=1"),
           ('Lana', 'Del Rey', 'LanaDel', '4387654321', 'LustForLife', 2,"12:00-14:00","https://hips.hearstapps.com/hmg-prod/images/singer-lana-del-rey-poses-for-a-portrait-during-a-visit-to-news-photo-1590067847.jpg?crop=0.88889xw:1xh;center,top&resize=1200:*"),
           ('Abel', 'Tesfaye', 'TheWeeknd', '4384567890', 'KissLand',3,"14:00-19:00","https://th.bing.com/th/id/OIP.ukKPaPoDOYw7TuSYy2nyfAHaJ3?rs=1&pid=ImgDetMain"),
           ('Eunwoo', 'Cha', 'ChaEunWoo', '4380987654', 'Bulgogi',4,"15:00-18:00","https://i.pinimg.com/originals/0a/65/a8/0a65a83ddd06fc16066efe538a940fb6.jpg");

INSERT INTO Reservations ( dateReservation, heure,idClient, idCoiffeur, idTypeCoiffure)
    VALUES ('2024-03-29','10:15', 4, 1, 1);

INSERT INTO TypeCoiffure (nomCoiffure)
    VALUES ('High Fade'),
            ( 'Low Fade'),
            ('Buzz Cut'), 
            ('Undercut'),
            ('Pompadour'), 
            ('Quiff'), 
            ('Comb Over'),
            ('Slicked Back'), 
            ('Faux Hawk');


INSERT INTO Avis(idClient, idCoiffeur, note, review)
    VALUES (1, 1, 4.5, 'Great service!'),
           (2, 2, 3.5, 'Good service!'),
           (3, 3, 2.5, 'Okay service!'),
           (4, 4, 1.5, 'Bad service!');


INSERT INTO SALONS (nom, adresseCourriel, adresse, descriptionSalon)
    VALUES ('Dubois chic', 'DuboisChic@gmail.com', '1234 rue Dubois', 'Salon de coiffure pour hommes et femmes'),
           ('Dave capi', 'DaveCapi@gmail.com', '5678 rue Dave', 'Salon de coiffure pour hommes'),
           ('Harin kity', 'harinKitty@outlook.com', '91011 rue Harin', 'Salon de coiffure pour femmes'),
           ('Edwardo Ari', 'EdwardoAri@outlook.com', '1213 rue Edwardo', 'Salon de coiffure pour hommes et femmes');

           
INSERT INTO Salons (nom, adresseCourriel, adresse, descriptionSalon,idTypeCoiffure)
    VALUES ('Dubois chic', 'DuboisChic@gmail.com', '1234 rue Dubois', 'Salon de coiffure pour hommes et femmes',1),
           ('Dave capi', 'DaveCapi@gmail.com', '5678 rue Dave', 'Salon de coiffure pour hommes',2),
           ('Harin kity', 'harinKitty@outlook.com', '91011 rue Harin', 'Salon de coiffure pour femmes',3),
           ('Edwardo Ari', 'EdwardoAri@outlook.com', '1213 rue Edwardo', 'Salon de coiffure pour hommes et femmes',4);
