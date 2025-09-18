<>
          {index !== 0 && index % 2 !== 0 && <Grid container>
            <Grid>
              <Tooltip
                title={evolutionLine[0].name}
                slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
                arrow
                disableInteractive
              >
                <img
                  src={evolutionLine[0].image}
                  alt={evolutionLine[0].name}
                  width={below400 ? 10 : 20}
                  height={below400 ? 10 : 20}
                />
              </Tooltip>
            </Grid>
            <ArrowRightAltIcon fontSize='medium'/>
            <Grid>
              <Tooltip
                title={evolutionLine[index].name}
                slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
                arrow
                disableInteractive
              >
                <img
                  src={evolutionLine[index].image}
                  alt={evolutionLine[index].name}
                  width={below400 ? 10 : 20}
                  height={below400 ? 10 : 20}
                />
              </Tooltip>
              <Tooltip
                title={evolutionLine[index+1].name}
                slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
                arrow
                disableInteractive
              >
                <img
                  src={evolutionLine[index+1].image}
                  alt={evolutionLine[index+1].name}
                  width={below400 ? 10 : 20}
                  height={below400 ? 10 : 20}
                />
              </Tooltip>
            </Grid>
          </Grid>
          }
        </>
