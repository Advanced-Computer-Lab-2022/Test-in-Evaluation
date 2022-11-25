import { Box, Button, Container, Typography } from "@mui/material";

const ContractPage = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                border: "2px solid white",
                borderRadius: "1.5rem",
                backgroundColor: "white",
                padding: "2rem 3rem",
            }}
        >
            <Typography variant="h2" component="h1">
                Contract
            </Typography>
            <Typography variant="body1" lineHeight="1.7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quasi dolores est accusantium itaque minus, earum adipisci
                voluptatibus reiciendis repudiandae. Placeat quae, repellendus
                at atque tempora culpa eligendi aliquid deserunt doloremque
                quis, quia nemo eum neque eius natus eveniet, ipsam laboriosam
                molestias distinctio ducimus. Sint facilis officiis eaque
                voluptas possimus! Rem est quos sunt placeat voluptas, tempore
                nobis suscipit illo eum blanditiis quasi quas quam doloremque
                eligendi error quia explicabo repellendus officiis quibusdam
                similique dolore autem necessitatibus soluta. Qui, quibusdam
                expedita! Fugit reprehenderit ab quas, sed dolorum quod pariatur
                aspernatur magni minima nisi, corrupti voluptates odit debitis
                voluptas? Dolores impedit vero pariatur magni temporibus
                obcaecati incidunt, culpa excepturi harum ex suscipit, debitis
                cumque atque et officiis cum! Tempore non quod, itaque velit
                recusandae temporibus suscipit est natus quas dolores, aliquid
                deserunt, expedita laudantium. Ullam quod minima ipsum molestias
                nulla facilis voluptatibus enim libero, vel officia. Minus unde
                magni commodi soluta.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between",
                    width: "50%",
                }}
            >
                <Button variant="contained" color="success">
                    Accept
                </Button>
                <Button variant="contained" color="error">
                    Decline
                </Button>
            </Box>
        </Container>
    );
};

export default ContractPage;
