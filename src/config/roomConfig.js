export const roomConfig = [
    {
        room: "Bedroom",
        light: {
            endpoint: "/bedroom/light"
        },
        temperature: {
            endpoint: "/bedroom/temperature"
        }
    }
    , {
        room: "Living Room",
        light: {
            endpoint: "/living/light"
        },
        temperature: {
            endpoint: "/living/temperature"
        }
    },
    {
        room: "Kitchen",
        roomState: "outside",
        light: {
            endpoint: "/kitchen/light"
        },
        temperature: {
            endpoint: "/kitchen/temperature"
        }
    }
];
