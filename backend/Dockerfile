FROM golang:alpine

WORKDIR /app

# Instalar dependencias para Air (hot reload)
RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Usar air para auto-reload
CMD ["air", "-c", ".air.toml"]
