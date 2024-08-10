package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Heading   string             `json:"heading"`
	Body      string             `json:"body"`
	CreatedAt time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

var collection *mongo.Collection // a pointer to the mongo collection

func main() {

	//: Deployment
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal("Error Loading .env file", err)
		}
	}

	//: Development
	// err := godotenv.Load(".env")
	// if err != nil {
	// 	log.Fatal("Error Loading .env file", err)
	// }

	MONGODB_URI := os.Getenv("MONGODB_URI")

	clientOption := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOption)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB ✅")

	collection = client.Database("golang_db").Collection("todos")

	app := fiber.New()

	//: Development
	// app.Use(cors.New(cors.Config{
	// 	AllowOrigins: "http://localhost:5173",
	// 	AllowHeaders: "Origin,Content-Type,Accept",
	// }))

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodos)
	app.Patch("/api/todos/:id", updateTodos)
	app.Delete("/api/todos/:id", deleteTodos)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	//: Deployment
	if os.Getenv("ENV") == "production" {
		app.Static("/", "./client/dist")
	}

	fmt.Println("Listening on PORT ::", port)

	log.Fatal(app.Listen("0.0.0.0:" + port))
}

func getTodos(c *fiber.Ctx) error {
	// sorting by CreatedAt in descending order
	sortOption := bson.M{"updated_at": -1}

	// Query with sorting option
	cursor, err := collection.Find(context.Background(), bson.M{}, options.Find().SetSort(sortOption))
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	var todos []Todo
	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return c.JSON(todos)
}

func createTodos(c *fiber.Ctx) error {
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Heading == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Can't add empty todo"})
	}

	now := time.Now()
	todo.CreatedAt = now
	todo.UpdatedAt = now

	insertRes, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = insertRes.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

func updateTodos(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid todo id"})
	}

	filter := bson.M{"_id": objectID}

	// Fetch the current todo to determine the current state of `completed`
	var todo struct {
		Completed bool `bson:"completed"`
	}
	err = collection.FindOne(context.Background(), filter).Decode(&todo)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "todo not found"})
	}

	// Toggle the `completed` field
	newCompletedState := !todo.Completed

	update := bson.M{
		"$set": bson.M{
			"completed":  newCompletedState,
			"updated_at": time.Now(),
		},
	}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}

func deleteTodos(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid todo id"})
	}

	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
