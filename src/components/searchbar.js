import React, {useState} from "react";
import { HStack, Icon, IconButton, Input, Heading,  } from "@chakra-ui/react";
import { BsSearch } from 'react-icons/bs';
import { FaRedditSquare } from "react-icons/fa";

export default function Searchbar(){
    const [searchText, setSearchText] = useState("");


    return(
        <HStack w='full' h='50px' p={10} spacing={10} alignItems='flex-start' bg='blackAlpha.50'>
            <HStack w='full' h='full' alignItems='center'>
                <Icon as={FaRedditSquare} w={14} h={16} color='blue.700'/><Heading fontSize='17px' as='b'>MINI<Heading fontSize='17px' color='blue.700'>REDDIT</Heading>APP</Heading>
            </HStack>
            <HStack w='full' h='full' alignItems='center'>
                <Input
                    color='blue.700'
                    placeholder="Search"
                    type='text'
                    value={searchText}
                    oneChange={(e) => setSearchText(e.currentTarget.value)}
                />
                <IconButton
                    color='blue.700'
                    aria-label='Search database'
                    icon={<BsSearch/>}
                />
            </HStack>
            <HStack w='full' h='full'></HStack>
        </HStack> 
    )
}