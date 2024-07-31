"use client";

import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCore } from "@/app/context/core";
import BackButton from "../../shared/BackButton";
import CustomCard from "../../shared/card";
import Link from "next/link";

export default function DonationsContentWrapper() {
  const [{ user }, coreDispatch] = useCore();

  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: 8 }}>
      <BackButton />
      <Typography variant="h1" component={"h1"} align="center" mb={3}>
        Recibe Donaciones
      </Typography>

      <CustomCard>
        <Stack direction={"column"} spacing={3}>
          <Typography variant="body1" component={"p"}>
            Como creador de contenido en nuestra plataforma, valoramos
            enormemente tu trabajo y queremos brindarte las herramientas
            necesarias para que puedas seguir creando contenido de calidad. Es
            por ello que te ofrecemos la opción de recibir donaciones de tus
            seguidores más fieles.
          </Typography>

          <Box>
            <Typography variant="h2" component={"h1"}>
              ¿Cómo funciona?
            </Typography>

            <ol>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Activación de Donaciones: </b>Para habilitar la opción de
                  recibir donaciones en tu blog, simplemente debes hacer clic en
                  el botón "Activar Donaciones". Al hacerlo, estarás dando el
                  primer paso para conectar tu blog con nuestra plataforma de
                  pagos.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Vinculación con Mercado Pago: </b>Una vez que hayas
                  activado esta función, serás redirigido a una página segura de
                  Mercado Pago, nuestro socio de confianza para procesar pagos.
                  Allí deberás iniciar sesión con tu cuenta de Mercado Pago o
                  crear una nueva si aún no tienes una.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Conexión de Cuentas: </b>Al vincular tu cuenta de Mercado
                  Pago con tu perfil en nuestra plataforma, estarás autorizando
                  a Mercado Pago a procesar las donaciones que recibas a través
                  de tu blog. Tus datos personales y financieros estarán siempre
                  protegidos bajo los estándares de seguridad más altos.
                </Typography>
              </li>
            </ol>
          </Box>
          <Box>
            <Typography variant="h2" component={"h1"}>
              ¿Por qué usar Mercado Pago?
            </Typography>

            <ul>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Seguridad: </b>Mercado Pago es una plataforma de pagos
                  líder en el mercado, reconocida por su alta seguridad y
                  confiabilidad.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Facilidad de uso: </b>El proceso de vinculación es sencillo
                  e intuitivo, y podrás gestionar tus donaciones de manera fácil
                  y rápida.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Variedad de métodos de pago: </b>Tus seguidores podrán
                  realizar donaciones utilizando una amplia gama de métodos de
                  pago disponibles en Mercado Pago.
                </Typography>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography variant="h2" component={"h1"}>
              Importante:
            </Typography>

            <ul>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Donaciones Voluntarias: </b> Las donaciones son
                  completamente voluntarias y tus seguidores pueden elegir la
                  cantidad que deseen aportar.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component={"p"}>
                  <b>Información Confidencial: </b>La información financiera que
                  proporciones a Mercado Pago será tratada de manera
                  confidencial y solo será utilizada para procesar las
                  donaciones.
                </Typography>
              </li>
            </ul>

            <Typography variant="body1" component={"p"}>
              Al activar la opción de recibir donaciones, estás aceptando los
              términos y condiciones de Mercado Pago y de nuestra plataforma.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" component={"h1"}>
              ¿Tienes alguna duda?
            </Typography>
            <Typography variant="body1" component={"p"}>
              Si tienes alguna pregunta sobre el proceso de donaciones o la
              vinculación con Mercado Pago, no dudes en contactarnos a través de
              nuestro centro de ayuda.
            </Typography>
          </Box>

          {user && (
            <Stack direction={"row"} justifyContent={"center"}>
              <Link
                target="_blank"
                href={`https://auth.mercadopago.com.ar/authorization?client_id=${process.env.NEXT_PUBLIC_MERCADOPAGO_APP_ID}&response_type=code&platform_id=mp&state=${user.data._id}&redirect_uri=https%3A%2F%2Fblog-point-nine.vercel.app%2F/procesando-vinculacion`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained">Activar donaciones</Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </CustomCard>
    </Container>
  );
}
