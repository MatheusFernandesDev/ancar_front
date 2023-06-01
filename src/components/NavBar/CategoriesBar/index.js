import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "@/services/api";

const CategoriesBar = () => {
    const [categories, setCategories] = useState(false);
    const [detailedCat, setDetailedCat] = useState(false);
    //
    const [idCategory, setIdCategory] = useState(-1);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [detailedCatOptions, setDetailedCatOptions] = useState([]);

    async function loadCategories() {
      const { data: response } = await api.get("/category");
      setCategoriesOptions(response)
    }
    // async function loadDetailsCat() {
    //   const { data: response } = await api.get(``, { validateStatus: status => status === 200 || status === 204 });
    //   setDetailedCatOptions(response);
    // }

    useEffect(() => {
      loadCategories();
    }, []);
    
    return (
        <Box 
          h="30px" 
          backgroundColor="white" 
          padding="10px" 
          display={{ base: 'none', lg: 'flex' }} 
          alignItems="center" 
          justifyContent="flex-start" 
          position="relative"
        >
          <Button 
            width="300px" 
            height="fit-content" 
            padding="5px 20px"
            background="transparent"
            _hover="none"
            fontSize={13}
            fontWeight={400}
            onMouseOver={() => setCategories(true)}
            onMouseLeave={() => setCategories(false)}
          >
            Categorias
          </Button>
          {categories &&
            <Box
              position="absolute"
              top="28px"
              left="0"
              zIndex="2"
              display="flex"
              height="fit-content"
              minHeight="200px"
              width="100%"
              boxShadow="0 10px 10px #d5d5d5"
              backgroundColor="white"
              onMouseOver={() => setCategories(true)}
              onMouseLeave={() => setCategories(false)}
            >
              <Box
                height="100%"
                width="15%"
                display="flex"
                flexDirection="column"
                borderRight="1px solid #aaa"
              >
                {categoriesOptions.map(element => (
                  <Text 
                    key={element.id}
                    color="black" 
                    fontWeight={400} 
                    fontSize={18} 
                    height="fit-content"
                    width="100%"
                    padding="5px 15px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    columnGap="20px"
                    cursor="pointer"
                    onMouseOver={() => {setIdCategory(element.id);setDetailedCat(true)}}
                    onMouseLeave={() => {setIdCategory(-1);setDetailedCat(false)}}
                  >
                    {element.description}
                    <ChevronRightIcon />
                  </Text>
                ))}
              </Box>
              {detailedCat &&
                <Box
                  key={idCategory}
                  height="100%"
                  width="85%"
                  padding="10px 20px"
                  display="flex"
                  flexWrap="wrap"
                  gap="30px 20px"
                  onMouseOver={() => setDetailedCat(true)}
                  onMouseLeave={() => setDetailedCat(false)}
                >
                  <Box 
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Text 
                      fontWeight={600} 
                      fontSize={18}
                    >
                      Classificacao {categoriesOptions.find(element => element.id === idCategory)?.description}
                    </Text>
                    <Text 
                      fontWeight={400} 
                      fontSize={15}
                    >
                      Classificacao
                    </Text>
                  </Box>
                </Box>
              }
            </Box>
          }
        </Box>
    )
}

export default CategoriesBar;